import express from "express";
import {
  handleDeleteUser,
  handleGetUsersByRole,
  handleUpdateUserBlockedStatus,
} from "../controllers/admin";

const router = express.Router();

router.get("/getUsersByRole", handleGetUsersByRole);
router.patch("/user/:userId/block", handleUpdateUserBlockedStatus);
router.delete("/user/:userId", handleDeleteUser);

export default router;
