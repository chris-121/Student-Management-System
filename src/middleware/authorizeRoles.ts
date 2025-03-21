import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils";

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new UnauthorizedError(
        "You are not authorized to access this route"
      );
    }
    next();
  };
};
