import User, { IUser } from "../model/user.model";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../utils";
import { AuthUser, Role, ROLE_VALUES } from "../types";
import bcrypt from "bcrypt";

export const create = async (userData: IUser): Promise<IUser> => {
  try {
    if (!userData) throw new BadRequestError("User data is required");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
      ...userData,
      password: hashedPassword,
    });

    return user;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new BadRequestError("Duplicate entry: User already exists");
    }
    throw error;
  }
};

export const findById = async (userId: string): Promise<IUser> => {
  if (!userId) throw new BadRequestError("User ID is required");

  const user = await User.findById(userId).select("-password").lean();

  if (!user) throw new NotFoundError("User not found");

  return user;
};

export const findAll = async ({ role }: { role?: Role }): Promise<IUser[]> => {
  return await User.find({ ...(role ? { role } : {}) })
    .select("-password")
    .lean();
};

export const update = async (
  id: string,
  updates: Partial<IUser>,
  authUser: AuthUser
): Promise<IUser> => {
  if (!id) throw new BadRequestError("User ID is required");

  if (authUser.role !== ROLE_VALUES.ADMIN) {
    throw new UnauthorizedError("You are not authorized to update this user");
  }

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(id, updates, {
    new: true,
  });

  if (!updatedUser) throw new NotFoundError("User not found");

  return updatedUser;
};

export const deleteUser = async (
  userId: string,
  authUser: AuthUser
): Promise<void> => {
  if (!userId) throw new BadRequestError("User ID is required");

  if (authUser.role !== ROLE_VALUES.ADMIN)
    throw new UnauthorizedError("You are not authorized to delete users");

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError("User not found");

  if (user.role === ROLE_VALUES.ADMIN) {
    throw new UnauthorizedError("Cannot delete an admin user");
  }

  await user.deleteOne();
};
