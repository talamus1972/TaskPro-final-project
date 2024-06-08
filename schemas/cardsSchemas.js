import Joi from "joi";

export const createCardSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string(),
  deadline: Joi.string().required(),
  columnId: Joi.string().required(),
});

export const updateCardSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string(),
  deadline: Joi.string(),
})
  .min(1)
  .message("Body must have at least one field");

export const moveCardSchema = Joi.object({
  columnId: Joi.string().required(),
});

export const updateCardStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
