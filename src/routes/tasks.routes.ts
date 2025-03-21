import { Router } from "express";
import * as taskController from "../controller/tasks.controller";
import { isAuthenticated, authorizeRoles } from "../middleware";
import { ROLE_VALUES } from "../types";

const router = Router();

router
  .route("/")
  .get(isAuthenticated, taskController.getAllTasks)
  .post(
    isAuthenticated,
    authorizeRoles(ROLE_VALUES.ADMIN),
    taskController.createTask
  );

router
  .route("/:id")
  .get(isAuthenticated, taskController.getTask)
  .put(isAuthenticated, taskController.updateTask)
  .delete(
    isAuthenticated,
    authorizeRoles(ROLE_VALUES.ADMIN),
    taskController.deleteTask
  );

export default router;
