import { Router } from "express";
import * as userController from "../controller/users.controller";
import { isAuthenticated, authorizeRoles } from "../middleware";
import { ROLE_VALUES } from "../types";

const router = Router();

router.route("/me").get(isAuthenticated, userController.getUser);

router
  .route("/")
  .get(
    isAuthenticated,
    authorizeRoles(ROLE_VALUES.ADMIN),
    userController.getAllStudent
  )
  .post(
    isAuthenticated,
    authorizeRoles(ROLE_VALUES.ADMIN),
    userController.createUser
  );

router
  .route("/:id")
  .get(
    isAuthenticated,
    authorizeRoles(ROLE_VALUES.ADMIN),
    userController.getUser
  )
  .put(
    isAuthenticated,
    authorizeRoles(ROLE_VALUES.ADMIN),
    userController.updateUser
  )
  .delete(
    isAuthenticated,
    authorizeRoles(ROLE_VALUES.ADMIN),
    userController.deleteUser
  );

export default router;
