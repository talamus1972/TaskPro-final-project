import Joi from "joi";

export const createBoardSchema = Joi.object({
  title: Joi.string().required(),
  icons: Joi.string().required(),
  background: Joi.string(),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string(),
  icons: Joi.string(),
  background: Joi.string(),
});