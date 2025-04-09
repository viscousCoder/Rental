import { Response } from "express";
import { Users } from "../entities/Users";
import { AuthenticatedRequest } from "../types/requestTypes";
import { getConnection } from "../database/db.config";

export async function handleGetUsersByRole(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const userrole = req.headers["x-userrole"] as string;
  try {
    const AppDataSource = await getConnection();
    const userRepo = AppDataSource.getRepository(Users);

    if (!userrole) {
      res.status(400).json({ error: "User role is required in headers" });
      return;
    }

    const users = await userRepo.find({
      where: { userrole: userrole },
    });

    if (users.length > 0) {
      res.status(200).json({ users });
    } else {
      res.status(200).json({ users });
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

// Update user's blocked status
export async function handleUpdateUserBlockedStatus(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const { userId } = req.params;
  const { blocked } = req.body;

  if (typeof blocked !== "boolean") {
    res.status(400).json({ error: "`blocked` must be a boolean" });
    return;
  }

  try {
    const AppDataSource = await getConnection();
    const userRepo = AppDataSource.getRepository(Users);

    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.blocked = blocked;
    await userRepo.save(user);

    res.status(200).json({ message: "User blocked status updated", user });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// Delete user by ID
export async function handleDeleteUser(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const { userId } = req.params;

  try {
    const AppDataSource = await getConnection();
    const userRepo = AppDataSource.getRepository(Users);

    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await userRepo.remove(user);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
