import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import { getConnection } from "./database/db.config";
import authRouter from "./routes/auth";
import ownerRoute from "./routes/owner";
import paymentRoute from "./routes/payment";
import {
  handleAuthentication,
  handleAuthorization,
} from "./middleware/AuthMiddleware";

const app: Application = express();
const port = 1234;
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://rental0.netlify.app",
    methods: ["PUT", "POST", "DELETE", "GET", "PATCH"],
    credentials: true,
  })
);

async function init() {
  try {
    await getConnection();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/", paymentRoute);

    app.use(handleAuthentication);

    //routes
    app.use("/", authRouter);
    app.use("/", handleAuthorization(["Property Owner"]), ownerRoute);
    app.listen(port, () => console.log("Server is running at port ", port));
  } catch (error) {
    console.log(`Error while connection ${error}`);
  }
}

init();
