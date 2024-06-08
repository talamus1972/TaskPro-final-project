import express from "express";
import {
  getAllCards,
  getOneCard,
  deleteCard,
  createCard,
  updateCard,
  updateStatusCard,
  getFavoriteCards,
} from "../controllers/cardControllers.js";

import { isValidId, validateBody, authenticate } from "../middlewares/index.js";

import {
  createCardSchema,
  updateCardSchema,
  updateCardStatusSchema,
} from "../schemas/cardsSchemas.js";

const cardsRouter = express.Router();

cardsRouter.post("/", authenticate, validateBody(createCardSchema), createCard);

cardsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateCardSchema),
  updateCard
);

cardsRouter.delete("/:id", authenticate, isValidId, deleteCard);

//============================================//

cardsRouter.get("/", authenticate, getAllCards);

cardsRouter.get("/", authenticate, getFavoriteCards);

cardsRouter.get("/:id", authenticate, isValidId, getOneCard);

cardsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateCardStatusSchema),
  updateStatusCard
);

export default cardsRouter;
