import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);

    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    next(err);
  }
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: "Logout successful" });
};
