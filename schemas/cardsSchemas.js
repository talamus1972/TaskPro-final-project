import Joi from "joi";

export const createCardSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  subscription: Joi.string().required(),
});

export const updateCardSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  subscription: Joi.string(),
});
// .min(1)
// .message("Body must have at least one field");

export const updateCardStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
