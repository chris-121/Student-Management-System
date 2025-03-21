import Joi from "joi";

import { ROLE_VALUES } from "../types/userRoles";

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  role: Joi.string()
    .valid(...Object.values(ROLE_VALUES))
    .required(),
  password: Joi.string().min(4).required(),
  department: Joi.string(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  role: Joi.string().valid(...Object.values(ROLE_VALUES)),
  password: Joi.string().min(6),
  department: Joi.string(),
}).min(1);
