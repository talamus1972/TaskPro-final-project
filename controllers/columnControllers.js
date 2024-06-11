import { HttpError } from "../helpers/index.js";

import Column from "../models/column.js";
import Card from "../models/card.js";

import { isValidObjectId } from "mongoose";
import Board from "../models/board.js";

export const createColumn = async (req, res, next) => {
  try {
    const { boardId, title } = req.body;
    if (!isValidObjectId(boardId)) {
      throw HttpError(400, "Invalid Board ID");
    }

    const boardExists = await Board.findById(boardId);
    if (!boardExists) {
      throw HttpError(404, "Board not found");
    }

    const result = await Column.create({ title, board: boardId });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getColumnById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      throw HttpError(400, "Invalid Column ID");
    }

    const column = await Column.findById(id);

    if (!column) {
      throw HttpError(404, "Column not found");
    }

    const cards = await Card.find({ column: column._id });

    const columnData = {
      _id: column._id,
      title: column.title,
      cards: cards.map((card) => ({
        _id: card._id,
        title: card.title,
        description: card.description,
        priority: card.priority,
        deadline: card.deadline,
      })),
    };

    res.json(columnData);
  } catch (error) {
    next(error);
  }
};

export const updateColumn = async (req, res, next) => {
  try {
    const { id: columnId } = req.params;
    const result = await Column.findOneAndUpdate({ _id: columnId }, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteColumn = async (req, res, next) => {
  try {
    const { id: columnId } = req.params;
    const result = await Column.findOneAndDelete({ _id: columnId });
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
};
