import { ObjectSchema } from "joi";
import { BadRequestError } from "./errors";

export const validateData = (schema: ObjectSchema, data: any) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    throw new BadRequestError(message);
  }
};
