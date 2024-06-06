import Joi from "joi";

export const createContactSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  subscription: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  subscription: Joi.string(),
});
// .min(1)
// .message("Body must have at least one field");

export const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
