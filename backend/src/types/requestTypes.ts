import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    fullname: string;
    email: string;
    mobile: string;
    userrole: string;
  };
}
