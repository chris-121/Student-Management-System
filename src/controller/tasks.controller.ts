import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/tasks.service";
import { getAuthUser, validateData } from "../utils";
import { ROLE_VALUES } from "../types";
import { createTaskSchema, updateTaskSchema } from "../validation/task";

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUser = getAuthUser(req);
    const filter = {
      ...(authUser.role === ROLE_VALUES.STUDENT ? { userId: authUser.id } : {}),
    };
    const tasks = await taskService.getAllTasks(filter);
    res.status(200).json({ tasks });
  } catch (err) {
    next(err);
  }
};

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.id;
    const authUser = getAuthUser(req);
    const task = await taskService.getTask(taskId, authUser);
    res.status(200).json({ task });
  } catch (err) {
    next(err);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateData(createTaskSchema, req.body);
    const newTask = await taskService.createTask(req.body);
    res.status(201).json({ message: "Task created", task: newTask });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUser = getAuthUser(req);
    validateData(updateTaskSchema, req.body);

    const updatedTask = await taskService.updateTask(
      req.params.id,
      req.body,
      authUser
    );
    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUser = getAuthUser(req);
    await taskService.deleteTask(req.params.id, authUser);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
