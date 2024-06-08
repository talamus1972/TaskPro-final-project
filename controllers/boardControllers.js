import { HttpError } from "../helpers/index.js";

import Board from "../models/board.js";

export const createBoard = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Board.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneBoard = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id: boardId } = req.params;
    const result = await Board.findOne({ _id: boardId, owner });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateBoard = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id: boardId } = req.params;
    const result = await Board.findOneAndUpdate(
      { _id: boardId, owner },
      req.body,
      { new: true }
    );
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteBoard = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id: boardId } = req.params;
    const result = await Board.findOneAndDelete({ _id: boardId, owner });
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
};

export const updateBoardThema = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id: boardId } = req.params;
    const { theme } = req.body;

    const themeList = ["dark", "light", "violet"];
    if (theme && !themeList.includes(theme)) {
      throw HttpError(400, "Invalid theme");
    }

    const result = await Board.findOneAndUpdate(
      { _id: boardId, owner },
      req.body,
      { new: true }
    );

    if (!result) {
      throw HttpError(404, "Not Found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
