import express from "express";
import {
  getOneBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  updateBoardThema,
} from "../controllers/boardControllers.js";

import { isValidId, validateBody, authenticate } from "../middlewares/index.js";

import {
  createBoardSchema,
  updateBoardSchema,
  updateBoardSchemaThema,
} from "../schemas/boardsSchemas.js";

const boardsRouter = express.Router();

boardsRouter.get("/:id", authenticate, isValidId, getOneBoard);

boardsRouter.post(
  "/",
  authenticate,
  validateBody(createBoardSchema),
  createBoard
);

boardsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateBoardSchema),
  updateBoard
);

boardsRouter.delete("/:id", authenticate, isValidId, deleteBoard);

boardsRouter.patch(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateBoardSchemaThema),
  updateBoardThema
);

export default boardsRouter;
