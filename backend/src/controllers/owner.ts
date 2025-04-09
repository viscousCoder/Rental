// import { NextFunction, Request, Response } from "express";
// import cloudinary from "../config/cloudinary";
// import { Property } from "../entities/Property";
// import { Amenities } from "../entities/Amenities";
// import { Images } from "../entities/Images";
// import { Users } from "../entities/Users";
// import { getConnection } from "../database/db.config";
// import { AuthenticatedRequest } from "../types/requestTypes";

// export async function handleCreateProperty(
//   req: AuthenticatedRequest,
//   res: Response
// ): Promise<void> {
//   try {
//     const AppDataSource = await getConnection();
//     const {
//       propertyName,
//       propertyType,
//       location,
//       monthlyRent,
//       securityDeposit,
//       roomType,
//       noofrooms,
//       gender,
//       description,
//       houseRules,
//       contactName,
//       contactPhone,
//       contactEmail,
//       amenities,
//     } = req.body;

//     const userId = req.user?.id;

//     const userRepository = AppDataSource.getRepository(Users);
//     const propertyRepository = AppDataSource.getRepository(Property);
//     const amenitiesRepository = AppDataSource.getRepository(Amenities);
//     const imageRepository = AppDataSource.getRepository(Images);

//     const user = await userRepository.findOneBy({ id: userId });

//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     // 1. Create base property
//     const newProperty = propertyRepository.create({
//       propertyName,
//       propertyType,
//       location,
//       monthlyRent,
//       securityDeposit,
//       roomType,
//       noofrooms,
//       gender,
//       description,
//       houseRules,
//       contactName,
//       contactPhone,
//       contactEmail,
//       user,
//     });

//     await propertyRepository.save(newProperty);

//     // 2. Save dynamic amenities
//     let parsedAmenities = {};

//     if (typeof amenities === "string") {
//       parsedAmenities = JSON.parse(amenities);
//     } else if (typeof amenities === "object") {
//       parsedAmenities = amenities;
//     }

//     if (parsedAmenities && typeof parsedAmenities === "object") {
//       const amenityEntries = Object.entries(parsedAmenities);

//       for (const [key, value] of amenityEntries) {
//         const amenity = amenitiesRepository.create({
//           key: key,
//           value: Boolean(value),
//           property: newProperty,
//         });

//         await amenitiesRepository.save(amenity);
//       }
//     }

//     // 3. Upload and save images
//     const files = (req.files as { images?: Express.Multer.File[] })?.images;

//     if (files && files.length > 0) {
//       for (const file of files) {
//         const result = await cloudinary.uploader.upload_stream(
//           { folder: "rental" },
//           async (error, result) => {
//             if (error || !result) {
//               console.error("Cloudinary error:", error);
//               return;
//             }

//             const image = imageRepository.create({
//               url: result.secure_url,
//               property: newProperty,
//             });

//             await imageRepository.save(image);
//           }
//         );

//         // Feed the file buffer to the stream
//         result.end(file.buffer);
//       }
//     }

//     res.status(201).json({ message: "Property created successfully" });
//   } catch (error) {
//     console.error("Create Property Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

// export async function handleGetCurrentOwnerProperty(
//   req: AuthenticatedRequest,
//   res: Response
// ): Promise<void> {
//   try {
//     const AppDataSource = await getConnection();
//     const propertyRepository = AppDataSource.getRepository(Property);

//     const userId = req.user?.id;

//     if (!userId) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }

//     const userProperties = await propertyRepository.find({
//       where: { user: { id: userId } },
//       relations: ["user", "amenities", "images"],
//       order: { created_at: "DESC" },
//     });

//     res.status(200).json({ success: true, data: userProperties });
//   } catch (error) {
//     console.error("Error fetching user properties:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import { Property } from "../entities/Property";
import { Amenities } from "../entities/Amenities";
import { Images } from "../entities/Images";
import { Users } from "../entities/Users";
import { getConnection } from "../database/db.config";
import { AuthenticatedRequest } from "../types/requestTypes";

export async function handleCreateProperty(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const AppDataSource = await getConnection();
    const {
      propertyName,
      propertyType,
      location,
      monthlyRent,
      securityDeposit,
      roomType,
      noofrooms,
      gender,
      description,
      houseRules,
      contactName,
      contactPhone,
      contactEmail,
      amenities,
    } = req.body;

    const userId = req.user?.id;

    const userRepository = AppDataSource.getRepository(Users);
    const propertyRepository = AppDataSource.getRepository(Property);
    const amenitiesRepository = AppDataSource.getRepository(Amenities);
    const imageRepository = AppDataSource.getRepository(Images);

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // 1. Create and save base property
    const newProperty = propertyRepository.create({
      propertyName,
      propertyType,
      location,
      monthlyRent,
      securityDeposit,
      roomType,
      noofrooms,
      gender,
      description,
      houseRules,
      contactName,
      contactPhone,
      contactEmail,
      user,
    });

    await propertyRepository.save(newProperty);

    // 2. Save dynamic amenities
    let parsedAmenities = {};

    if (typeof amenities === "string") {
      parsedAmenities = JSON.parse(amenities);
    } else if (typeof amenities === "object") {
      parsedAmenities = amenities;
    }

    if (parsedAmenities && typeof parsedAmenities === "object") {
      const amenityEntries = Object.entries(parsedAmenities);

      for (const [key, value] of amenityEntries) {
        const amenity = amenitiesRepository.create({
          key: key,
          value: Boolean(value),
          property: newProperty,
        });

        await amenitiesRepository.save(amenity);
      }
    }

    // 3. Upload and save images
    const files = (req.files as { images?: Express.Multer.File[] })?.images;

    if (files && files.length > 0) {
      const uploadPromises = files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "rental" },
            (error, result) => {
              if (error || !result) {
                console.error("Cloudinary upload error:", error);
                reject(error || new Error("Upload failed"));
              } else {
                resolve(result.secure_url);
              }
            }
          );
          uploadStream.end(file.buffer);
        });
      });

      // Wait for all uploads to complete
      const uploadedUrls = await Promise.all(uploadPromises);

      // Save all images to the database
      const imageEntities = uploadedUrls.map((url) =>
        imageRepository.create({
          url,
          property: newProperty,
        })
      );

      await imageRepository.save(imageEntities);
    }

    // Fetch the fully populated property
    const savedProperty = await propertyRepository.findOne({
      where: { id: newProperty.id },
      relations: ["user", "amenities", "images"],
    });

    res.status(201).json({
      message: "Property created successfully",
      data: savedProperty,
    });
  } catch (error) {
    console.error("Create Property Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// export async function handleGetCurrentOwnerProperty(
//   req: AuthenticatedRequest,
//   res: Response
// ): Promise<void> {
//   try {
//     const AppDataSource = await getConnection();
//     const propertyRepository = AppDataSource.getRepository(Property);

//     const userId = req.user?.id;

//     if (!userId) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }

//     const userProperties = await propertyRepository.find({
//       where: { user: { id: userId } },
//       relations: ["user", "amenities", "images"],
//       order: { created_at: "DESC" },
//     });

//     res.status(200).json({ success: true, data: userProperties });
//   } catch (error) {
//     console.error("Error fetching user properties:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

export async function handleGetCurrentOwnerProperty(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const AppDataSource = await getConnection();
    const propertyRepository = AppDataSource.getRepository(Property);

    const userId = req.user?.id;
    const userRole = req.user?.userrole;

    if (!userId || !userRole) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    let properties;

    if (userRole === "Admin") {
      // Admin: fetch all properties
      properties = await propertyRepository.find({
        relations: ["user", "amenities", "images"],
        order: { created_at: "DESC" },
      });
    } else {
      // Non-admin: fetch only current user's properties
      properties = await propertyRepository.find({
        where: { user: { id: userId } },
        relations: ["user", "amenities", "images"],
        order: { created_at: "DESC" },
      });
    }

    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
