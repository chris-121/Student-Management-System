import { Router } from "express";
import * as authController from "../controller/auth.controller";

const router = Router();

router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

export default router;
