import Task, { ITask } from "../model/task.model";
import { AuthUser, ROLE_VALUES } from "../types";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  convertToObjectId,
} from "../utils";

export const getAllTasks = async ({
  userId,
}: {
  userId?: string;
}): Promise<ITask[]> => {
  return await Task.find({
    ...(userId ? { userId: convertToObjectId(userId) } : {}),
  }).populate("userId", "name");
};

export const getTask = async (
  id: string,
  authUser: AuthUser
): Promise<ITask> => {
  const task = await Task.findOne({
    _id: id,
    ...(authUser.role === ROLE_VALUES.STUDENT
      ? { userId: convertToObjectId(authUser.id) }
      : {}),
  }).populate("userId", "name");

  if (!task) throw new NotFoundError("Task not found");

  return task;
};

export const createTask = async (data: ITask): Promise<ITask> => {
  return await Task.create(data);
};

export const updateTask = async (
  id: string,
  data: Partial<ITask>,
  authUser: AuthUser
): Promise<ITask> => {
  const task = await Task.findOneAndUpdate(
    {
      _id: id,
      ...(authUser.role === ROLE_VALUES.STUDENT
        ? { userId: convertToObjectId(authUser.id) }
        : {}),
    },
    data,
    { new: true }
  );

  if (!task) throw new NotFoundError("Task not found");

  return task;
};

export const deleteTask = async (
  id: string,
  authUser: AuthUser
): Promise<void> => {
  if (!id) throw new BadRequestError("Task id is required");

  if (authUser.role !== ROLE_VALUES.ADMIN)
    throw new UnauthorizedError("You are not authorized to delete tasks");

  const result = await Task.findByIdAndDelete(id);
  if (!result) throw new NotFoundError("Task not found");
};
