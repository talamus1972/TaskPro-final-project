import express from "express";
import { validateBody, authenticate, isValidId, upload } from "../middlewares/index.js";
import {
  registerSchema,
  updateSubscriptionSchema,
  emailSchema
} from "../schemas/usersSchemas.js";
import {
  register,
  login,
  getCurrent,
  logout,
  updateSubscriptionUser,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail  
} from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);

authRouter.get("/verify/:verificationToken", verifyEmail)

authRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail)

authRouter.post("/login", validateBody(registerSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  "/:id/subscription",
  authenticate,
  isValidId,
  validateBody(updateSubscriptionSchema),
  updateSubscriptionUser
);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar)

export default authRouter;
