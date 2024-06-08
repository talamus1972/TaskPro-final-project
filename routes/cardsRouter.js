import express from "express";
import {
  getAllCards,
  getOneCard,
  deleteCard,
  createCard,
  updateCard,
  updateStatusCard,
  getFavoriteCard,
} from "../controllers/cardControllers.js";

import { isValidId, validateBody, authenticate } from "../middlewares/index.js";

import {
  createCardSchema,
  updateCardSchema,
  updateCardStatusSchema,
} from "../schemas/cardsSchemas.js";

const cardsRouter = express.Router();

cardsRouter.get("/", authenticate, getAllCards);

cardsRouter.get("/", authenticate, getFavoriteCard);

cardsRouter.get("/:id", authenticate, isValidId, getOneCard);

cardsRouter.delete("/:id", authenticate, isValidId, deleteCard);

cardsRouter.post("/", authenticate, validateBody(createCardSchema), createCard);

cardsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateCardSchema),
  updateCard
);

cardsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateCardStatusSchema),
  getFavoriteCard
);

export default cardsRouter;
