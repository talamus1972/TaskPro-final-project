import express from "express";
import { validateBody, authenticate, isValidId } from "../middlewares/index.js";
import {
  registerSchema,
  updateUserSchemaThema,
  emailSchema,
  loginSchema,
} from "../schemas/usersSchemas.js";
import {
  register,
  login,
  getCurrent,
  logout,
  updateThemeUser,
  verifyEmail,
  resendVerifyEmail,
  getUserData,
} from "../controllers/auth.js";

import upload from "../middlewares/uploadMiddleware.js";
import { updateAvatar } from "../controllers/updateAvatar.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);

authRouter.post("/login", validateBody(loginSchema), login);

authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateUserSchemaThema),
  updateThemeUser
);

authRouter.get("/data", authenticate, getUserData);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

//============================================//

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);

authRouter.get("/current", authenticate, getCurrent);

export default authRouter;
