import { Request, Response } from "express";
import { getConnection } from "../database/db.config";
import { Users } from "../entities/Users";
import { userInfo } from "../interfaces/auth";
import bcrypt from "bcryptjs";
import { handleGenerateToken } from "../utils/token";
import { AuthenticatedRequest } from "../types/requestTypes";
import { Property } from "../entities/Property";
import { Booking } from "../entities/Booking";

export async function handleRegister(
  req: Request,
  res: Response
): Promise<void> {
  const { fullname, email, password, userrole, mobile }: userInfo = req.body;
  console.log(fullname, email, password, userrole, mobile, "data");

  try {
    const AppDataSource = await getConnection();
    const userRepo = AppDataSource.getRepository(Users);

    const existingUser = await userRepo.findOne({
      where: { email: email },
    });

    if (existingUser) {
      res.status(409).json({ error: "Email already exists" });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = userRepo.create({
      fullname: fullname,
      email: email,
      password: hashPassword,
      mobile: mobile,
      userrole: userrole,
    });

    const savedUser = await userRepo.save(newUser);

    if (savedUser) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(400).json({ error: "Failed to create user record" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    } else {
      res.status(500).json({
        error: "Internal server error",
        details: "An unknown error occurred",
      });
    }
  }
}

export async function handleLogin(req: Request, res: Response): Promise<void> {
  const { email, password, userrole } = req.body;
  try {
    const AppDataSource = await getConnection();
    const userRepo = AppDataSource.getRepository(Users);

    //find email
    const existingUser = await userRepo.findOne({
      where: { email: email },
    });

    if (!existingUser) {
      res.status(404).json({ error: "No user found, please register" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    console.log("existing user", existingUser);
    const token = await handleGenerateToken(existingUser);
    const userData = { ...existingUser, token: token };
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleGetDetails(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const id = req.user?.id;
  if (!id) {
    res.status(401).json({ error: "Unauthorized: User is missing" });
    return;
  }

  try {
    const AppDataSource = await getConnection();
    const userRepo = AppDataSource.getRepository(Users);
    const user = await userRepo.findOne({
      where: { id },
    });

    if (!user) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error("Error getting user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleGetAllProperty(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const AppDataSource = await getConnection();
    const propertyRepo = AppDataSource.getRepository(Property);

    const properties = await propertyRepo.find({
      relations: ["user", "amenities", "images"],
      order: {
        created_at: "DESC",
      },
    });
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function handleGetProperty(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const propertyId = req.params.propertyId;

  if (!propertyId) {
    res
      .status(400)
      .json({ success: false, message: "Property ID is required" });
    return;
  }

  try {
    const AppDataSource = await getConnection();
    const propertyRepo = AppDataSource.getRepository(Property);

    const property = await propertyRepo.findOne({
      where: { id: propertyId },
      relations: ["user", "amenities", "images"],
    });

    if (!property) {
      res.status(404).json({ success: false, message: "Property not found" });
      return;
    }

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function handleUpdateProperty(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const propertyId = req.params.propertyId;
  const userId = req.user?.id;
  const { duration, moveInDate, totalAmount } = req.body;
  // console.log("helloDeata", duration, moveInDate, totalAmount);

  if (!propertyId) {
    res
      .status(400)
      .json({ success: false, message: "Property ID is required" });
    return;
  }

  try {
    // Get the connection and the property repository
    const AppDataSource = await getConnection();
    const propertyRepo = AppDataSource.getRepository(Property);

    // Fetch the property by propertyId
    const property = await propertyRepo.findOne({
      where: { id: propertyId },
    });

    if (!property) {
      res.status(404).json({ success: false, message: "Property not found" });
      return;
    }

    const currentNoOfRooms = parseInt(property.noofrooms);
    const updatedNoOfRooms = (currentNoOfRooms - 1).toString();

    property.noofrooms = updatedNoOfRooms;

    await propertyRepo.save(property);

    /**Nooking function user add karne ke liye */
    if (userId) {
      const bookingRepo = AppDataSource.getRepository(Booking);
      const userRepo = AppDataSource.getRepository(Users);

      // Fetch the user by userId
      const user = await userRepo.findOne({ where: { id: userId } });

      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }

      // Create a new Booking instance with full user object
      const newBooking = new Booking();
      newBooking.user = user;
      newBooking.property = property;
      newBooking.moveInDate = moveInDate;
      newBooking.duration = duration;
      newBooking.totalAmount = totalAmount;

      // console.log(newBooking, "helloDeata");
      await bookingRepo.save(newBooking);
    }

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function handleGetBookedProperty(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const userId = req.user?.id;

  if (!userId) {
    res.status(400).json({ success: false, message: "User ID is required" });
    return;
  }

  try {
    // Get the connection and the repositories for bookings and properties
    const AppDataSource = await getConnection();
    const bookingRepo = AppDataSource.getRepository(Booking);
    const propertyRepo = AppDataSource.getRepository(Property);

    const bookings = await bookingRepo.find({
      where: { user: { id: userId } },
      relations: ["property"],
    });

    if (!bookings || bookings.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "No bookings found for this user" });
      return;
    }

    // Get all property details, including amenities and images
    const bookedProperties = [];

    for (const booking of bookings) {
      const property = booking.property;

      if (property) {
        const amenities = await propertyRepo.findOne({
          where: { id: property.id },
          relations: ["amenities", "images"],
        });

        bookedProperties.push({
          propertyId: property.id,
          propertyName: property.propertyName,
          location: property.location,
          monthlyRent: property.monthlyRent,
          securityDeposit: property.securityDeposit,
          roomType: property.roomType,
          gender: property.gender,
          description: property.description,
          houseRules: property.houseRules,
          noofrooms: property.noofrooms,
          amenities: amenities?.amenities || [],
          images: amenities?.images || [],
          moveInDate: booking.moveInDate,
          duration: booking.duration,
          amount: booking.totalAmount,
        });
      }
    }

    res.status(200).json({ success: true, data: bookedProperties });
  } catch (error) {
    console.error("Error fetching booked properties:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
