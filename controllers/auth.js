import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import gravatar from "gravatar";
// import path from "node:path";

import { nanoid } from "nanoid";
import { sendEmail } from "../helpers/index.js";
import Board from "../models/board.js";
import Column from "../models/column.js";
import Card from "../models/card.js";

const { SECRET_KEY, BASE_URL } = process.env;

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL =
      "https://res.cloudinary.com/dwrqpvq7d/image/upload/v1718475448/avatar_dark_desktop_1x_h8kvio.png";

    const verificationToken = nanoid();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    const payload = {
      id: newUser._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(newUser._id, { token });

    const randomUserPassword = nanoid();

    res.status(201).json({
      token,
      email: newUser.email,
      name: newUser.name,
      avatarURL: newUser.avatarURL,
      id: newUser._id,
      theme: newUser.theme,
      password: newUser.password,
    });
  } catch (error) {
    next(error);
  }
};
export const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    console.log("Verifying email with token:", verificationToken);

    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw HttpError(401, "Email not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });

    res.json({
      message: "Verification successful",
    });
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    next(error);
  }
};

export const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "missing required field email" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, "Email not found");
    }

    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);
    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    console.error("Error in resendVerifyEmail:", error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    // if (!user.verify) {
    //   throw HttpError(401, "Email not verified");
    // }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, { token });

    // const randomUserPassword = nanoid();

    res.json({
      token,
      email: user.email,
      name: user.name,
      avatarURL: user.avatarURL,
      id: user._id,
      theme: user.theme,
      password: user.password,
    });
  } catch (error) {
    console.error("Error in login:", error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(200).json({ message: "You have successfully logged out" });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    console.log("Received body:", req.body);
    const { _id: userId } = req.user;
    const { password, ...updateFields } = req.body;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const result = await User.findOneAndUpdate({ _id: userId }, updateFields, {
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

export const updateThemeUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await User.findOneAndUpdate({ _id }, req.body, {
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

export const getCurrent = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);

    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }

    res.json({
      token: req.token,
      email: user.email,
      name: user.name,
      avatarURL: user.avatarURL,
      id: user._id,
      theme: user.theme,
    });
  } catch (error) {
    console.error("Error in getCurrent:", error);
    next(error);
  }
};

export const getUserData = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const boards = await Board.find({ owner: userId });

    let orderedData = [];

    for (const board of boards) {
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

      orderedData.push({
        _id: board._id,
        title: board.title,
        icon: board.icon,
        background: board.background,
        columns: columnData,
      });
    }

    res.json(orderedData);
  } catch (error) {
    next(error);
  }
};
