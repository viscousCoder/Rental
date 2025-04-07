import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { tokenPayload } from "../interfaces/auth";

dotenv.config();
const secret = process.env.JWTSECRETKEY as string;
if (!secret) {
  throw new Error("JWTSECRETKEY is not defined in the environment variables");
}

export async function handleGenerateToken(user: tokenPayload): Promise<string> {
  const payload: tokenPayload = {
    id: user.id,
    fullname: user.id,
    email: user.email,
    mobile: user.mobile,
    userrole: user.userrole,
  };
  return jwt.sign(payload, secret);
}

export async function handleCheckingToken(
  token: string
): Promise<tokenPayload | null> {
  try {
    const payload = jwt.verify(token, secret) as tokenPayload;
    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
