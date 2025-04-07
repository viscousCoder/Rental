import express from "express";
import {
  handleGetAllProperty,
  handleGetDetails,
  handleGetProperty,
  handleLogin,
  handleRegister,
  handleUpdateProperty,
  handleGetBookedProperty,
} from "../controllers/auth";

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);

router.get("/getDetails", handleGetDetails);

/**Get all Property */
router.get("/allproperty", handleGetAllProperty);
router.get("/property/:propertyId", handleGetProperty);

router.put("/update/:propertyId", handleUpdateProperty);
router.get("/get-booked-property", handleGetBookedProperty);

export default router;
