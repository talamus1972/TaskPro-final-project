import User from "../models/user.js";

import { v2 as Cloudinary } from "cloudinary";

export const updateAvatar = async (req, res, next) => {
  try {
    console.log("req.user:", req.user);
    console.log("req.file:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "File not provided" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarURL: req.file.path },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
};
