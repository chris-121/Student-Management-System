import { Request, Response, NextFunction } from "express";
import * as usersService from "../services/users.service";
import { userSchema, updateUserSchema } from "../validation/users";
import { getAuthUser, validateData } from "../utils";
import { Role } from "../types/userRoles";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id || getAuthUser(req).id;
    const user = await usersService.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = req.query.role as Role;
    const user = await usersService.findAll({ role });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateData(userSchema, req.body);

    const user = await usersService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    validateData(updateUserSchema, req.body);
    const authUser = getAuthUser(req);
    const user = await usersService.update(id, req.body, authUser);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const authUser = getAuthUser(req);
    await usersService.deleteUser(id, authUser);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};
