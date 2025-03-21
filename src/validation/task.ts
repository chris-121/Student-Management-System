import Joi from "joi";
import { STATUS_VALUES } from "../types/taskStatus";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow("").max(500),
  dueDate: Joi.date().required(),
  status: Joi.string()
    .valid(...Object.values(STATUS_VALUES))
    .default(STATUS_VALUES.PENDING),
  userId: Joi.string().length(24).hex().required(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().allow("").max(500),
  dueDate: Joi.date().iso(),
  status: Joi.string().valid(...Object.values(STATUS_VALUES)),
  userId: Joi.string().length(24).hex(),
}).min(1);
