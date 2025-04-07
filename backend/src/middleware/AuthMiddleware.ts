import { NextFunction, Request, Response } from "express";
import { tokenPayload } from "../interfaces/auth";
import { handleCheckingToken } from "../utils/token";

interface AuthenticatedRequest extends Request {
  user?: tokenPayload | null;
}
// export async function handleAuthentication(
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   const token = req.header("x-token") || req.body.token;
//   if (!token) {
//     return next();
//   }
//   try {
//     const user = await handleCheckingToken(token);
//     req.user = user;
//   } catch (error) {
//     console.log("Token verification failed", error);
//   }
//   return next();
// }

// Define the middleware with explicit RequestHandler typing
export const handleAuthentication = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token: string | undefined =
    req.header("x-token") || req.body.token || req.query.token;

  if (!token) {
    // req.user = null;
    return next();
  }

  try {
    const user: tokenPayload | null = await handleCheckingToken(token);
    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    // req.user = null;
    next();
  }
};

/**Authorization */
export function handleAuthorization(roles: string[]) {
  return function (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (!roles.includes(req.user.userrole)) {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      return;
    }
    next();
  };
}
