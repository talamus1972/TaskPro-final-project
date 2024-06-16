import express from "express";
import ctrWrapper from "../helpers/ctrWrapper.js";
import { googleAuth, googleRedirect } from "../controllers/authGoogle.js";

const authRouterGoogle = express.Router();

authRouterGoogle.get("/google", ctrWrapper(googleAuth));

authRouterGoogle.get("/google-redirect", ctrWrapper(googleRedirect));

export default authRouterGoogle;
