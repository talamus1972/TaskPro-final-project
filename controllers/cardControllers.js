import { HttpError } from "../helpers/index.js";
import { isValidObjectId } from "mongoose";

import Card from "../models/card.js";
import Column from "../models/column.js";

export const createCard = async (req, res, next) => {
  try {
    const { columnId, title, description, priority, deadline } = req.body;
    if (!isValidObjectId(columnId)) {
      throw HttpError(400, "Invalid Column ID");
    }
    const columnExists = await Column.findById(columnId);
    if (!columnExists) {
      throw HttpError(404, "Column not found");
    }
    const result = await Card.create({
      column: columnId,
      title,
      description,
      priority,
      deadline,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCard = async (req, res, next) => {
  try {
    const { id: cardId } = req.params;
    const result = await Card.findOneAndUpdate({ _id: cardId }, req.body, {
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

export const deleteCard = async (req, res, next) => {
  try {
    const { id: cardId } = req.params;
    const result = await Card.findOneAndDelete({ _id: cardId });
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
};







//======================================================================================//

export const getAllCards = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Card.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneCard = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id: contactId } = req.params;
    const result = await Card.findOne({ _id: contactId, owner });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusCard = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id: contactId } = req.params;
    const result = await Card.findOneAndUpdate(
      { _id: contactId, owner },
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

export const getFavoriteCards = async (req, res, next) => {
  try {
    const { favorite } = req.query;
    let filter = {};

    if (favorite === "true") {
      filter = { favorite: true };
    }

    const contacts = await Card.find(filter);

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};
