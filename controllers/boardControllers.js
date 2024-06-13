import { HttpError } from "../helpers/index.js";

import Board from "../models/board.js";
import user from "../models/user.js";

export const createBoard = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Board.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

import Column from "../models/column.js";
import Card from "../models/card.js";

export const getOneBoard = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id: boardId } = req.params;

    const board = await Board.findOne({ _id: boardId, owner });
    if (!board) {
      throw HttpError(404, "Not found");
    }

    const columns = await Column.find({ board: board._id });

    let columnData = [];

    for (const column of columns) {
      const cards = await Card.find({ column: column._id });

      let cardData = [];

      for (const card of cards) {
        cardData.push({
          _id: card._id,
          title: card.title,
          description: card.description,
          priority: card.priority,
          deadline: card.deadline,
        });
      }

      columnData.push({
        _id: column._id,
        title: column.title,
        cards: cardData,
      });
    }

    const result = {
      _id: board._id,
      title: board.title,
      icon: board.icon,
      background: board.background,
      theme: user.theme,
      columns: columnData,
    };

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

// export const updateBoardBackground = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { background } = req.body;

//     const board = await Board.findById(id);
//     if (!board) {
//       throw HttpError(404, "Board not found");
//     }

//     if (!background) {
//       return res.status(400).json({ message: "Background URL not provided" });
//     }

//     board.background = background;
//     await board.save();

//     res.json({ background: board.background });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateBoardThema = async (req, res, next) => {
//   try {
//     const { _id: owner } = req.user;
//     const { id: boardId } = req.params;
//     const { theme } = req.body;

//     const themeList = ["dark", "light", "violet"];
//     if (theme && !themeList.includes(theme)) {
//       throw HttpError(400, "Invalid theme");
//     }

//     const result = await Board.findOneAndUpdate(
//       { _id: boardId, owner },
//       req.body,
//       { new: true }
//     );

//     if (!result) {
//       throw HttpError(404, "Not Found");
//     }

//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };
