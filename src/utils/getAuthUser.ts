import { Request } from "express";
import { AuthUser } from "../types/authUser";
import { UnauthorizedError } from "../utils";

export const getAuthUser = (req: Request): AuthUser => {
  if (!req.user) {
    throw new UnauthorizedError("User not authenticated");
  }
  return req.user as AuthUser;
};
