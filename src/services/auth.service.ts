import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/user.model";
import { BadRequestError } from "../utils";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new BadRequestError("Email or password is incorrect");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new BadRequestError("Email or password is incorrect");

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, user };
};
