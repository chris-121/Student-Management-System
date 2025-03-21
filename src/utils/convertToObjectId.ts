import { Types } from "mongoose";
import { BadRequestError } from "./errors";

/**
 * Safely converts a string to a Mongoose ObjectId.
 * Throws an error if the string is not a valid ObjectId.
 */
export const convertToObjectId = (id: string): Types.ObjectId => {
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`Invalid ObjectId: ${id}`);
  }
  return new Types.ObjectId(id);
};
