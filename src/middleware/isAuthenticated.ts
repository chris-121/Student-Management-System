import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../utils";
import { Role } from "../types/userRoles";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new BadRequestError("Authorization header missing or malformed");
  }

  const token = authHeader.split(" ")[1];
  try {
    const JWT_SECRET = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: Role;
    };
    req.user = decoded;
    next();
  } catch (err) {
    throw new BadRequestError("Invalid or expired token");
  }
};
