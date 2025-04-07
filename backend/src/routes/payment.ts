import express from "express";
import { handlePayment } from "../controllers/payment";

const router = express.Router();

router.post("/create-checkout-session", handlePayment);

export default router;
