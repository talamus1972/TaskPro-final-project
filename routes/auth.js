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
  updateThemeAvatarUser,
  verifyEmail,
  resendVerifyEmail,
  getUserData,
  updateUser,
} from "../controllers/auth.js";

import { upload } from "../middlewares/upload.js";

import { updateAvatar } from "../controllers/updateAvatar.js";
import { userSendEmail } from "../controllers/userSendEmail.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);

authRouter.post("/login", validateBody(loginSchema), login);

authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateUserSchemaThema),
  updateThemeAvatarUser
);

authRouter.get("/data", authenticate, getUserData);

authRouter.put("/avatar", authenticate, upload.single("avatar"), updateAvatar);

authRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateUserSchema),
  updateUser
);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/help", authenticate, userSendEmail);

//============================================//

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);

export default authRouter;
