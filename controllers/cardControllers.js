import { HttpError } from "../helpers/index.js";

import Contact from "../models/contact.js";

const getAllCards = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getOneCard = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id: contactId } = req.params;
    const result = await Contact.findOne({ _id: contactId, owner });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id: contactId } = req.params;
    const result = await Contact.findOneAndDelete({ _id: contactId, owner });
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
};

const updateCard = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id: contactId } = req.params;
    const result = await Contact.findOneAndUpdate(
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

const updateStatusCard = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id: contactId } = req.params;
    const result = await Contact.findOneAndUpdate(
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

const getFavoriteCard = async (req, res, next) => {
  try {
    const { favorite } = req.query;
    let filter = {};

    if (favorite === "true") {
      filter = { favorite: true };
    }

    const contacts = await Contact.find(filter);

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export {
  getAllCards,
  getOneCard,
  createCard,
  deleteCard,
  updateCard,
  updateStatusCard,
  getFavoriteCard,
};
