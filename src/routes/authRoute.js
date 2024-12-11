import express from "express";
import { authController } from "../controllers/index.js";
import { validatorMiddleWare } from "../middleware/index.js";
import { loginSchema, signUpSchema } from "../validations/authValidation.js";

const router = express.Router();

router.post("/signup", validatorMiddleWare(signUpSchema), authController.signup);
router.post("/login", validatorMiddleWare(loginSchema), authController.login);

export default router;

