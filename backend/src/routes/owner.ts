import express from "express";
import { uploadMiddleware } from "../utils/multer.config";
import {
  handleCreateProperty,
  handleGetCurrentOwnerProperty,
} from "../controllers/owner";

const router = express.Router();

router.post("/property-listing", uploadMiddleware, handleCreateProperty);

router.post("/getCurrentOwnerProperty", handleGetCurrentOwnerProperty);
export default router;
