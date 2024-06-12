import express from "express";
import { validateBody, authenticate, isValidId } from "../middlewares/index.js";
import {
  registerSchema,
  updateUserSchemaThema,
  emailSchema,
  loginSchema,
  updateUserSchema,
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
  updateUser,
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

authRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateUserSchema),
  updateUser
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

authRouter.get("/current", authenticate, getCurrent);

//============================================//

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);

export default authRouter;
