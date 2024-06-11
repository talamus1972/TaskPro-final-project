import express from "express";
import {
  getOneBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  updateBoardBackground,
} from "../controllers/boardControllers.js";

import { isValidId, validateBody, authenticate } from "../middlewares/index.js";

import {
  createBoardSchema,
  updateBoardSchema,
} from "../schemas/boardsSchemas.js";

import upload from "../middlewares/uploadMiddleware.js";

const boardsRouter = express.Router();

boardsRouter.post(
  "/",
  authenticate,
  validateBody(createBoardSchema),
  createBoard
);

boardsRouter.get("/:id", authenticate, isValidId, getOneBoard);

boardsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateBoardSchema),
  updateBoard
);

boardsRouter.delete("/:id", authenticate, isValidId, deleteBoard);

boardsRouter.patch(
  "/:id/background",
  authenticate,
  upload.single("background"),
  updateBoardBackground
);

export default boardsRouter;
