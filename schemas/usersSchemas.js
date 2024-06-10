import Joi from "joi";
import { emailRegexp } from "../models/user.js";

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

export const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),

});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});
