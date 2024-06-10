import express from "express";
import {
  validateBody,
  authenticate,
  isValidId,
  upload,
} from "../middlewares/index.js";
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
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
  getUserData,
} from "../controllers/auth.js";

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

//============================================//

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);

authRouter.get("/current", authenticate, getCurrent);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

export default authRouter;
