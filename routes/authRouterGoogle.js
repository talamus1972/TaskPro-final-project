import express from "express";
import ctrWrapper from "../helpers/ctrWrapper";
import { googleAuth, googleRedirect } from "../controllers/authGoogle.js";

const authRouter = express.Router();

authRouter.get("/google", ctrWrapper(googleAuth));

authRouter.get("/google-redirect", ctrWrapper(googleRedirect));
