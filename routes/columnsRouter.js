import express from "express";
import {
  createColumn,
  getColumnById,
  updateColumn,
  deleteColumn,
} from "../controllers/columnControllers.js";

import { isValidId, validateBody, authenticate } from "../middlewares/index.js";

import {
  createColumnSchema,
  updateColumnSchema,
} from "../schemas/columnSchemas.js";

const columnsRouter = express.Router();

columnsRouter.post(
  "/",
  authenticate,
  validateBody(createColumnSchema),
  createColumn
);

columnsRouter.get("/:id", authenticate, getColumnById);

columnsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateColumnSchema),
  updateColumn
);

columnsRouter.delete("/:id", authenticate, isValidId, deleteColumn);

export default columnsRouter;
