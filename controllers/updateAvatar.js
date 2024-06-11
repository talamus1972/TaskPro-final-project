import User from "../models/user.js";

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File not provided" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: req.file.path },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ avatarURL: req.file.path });
  } catch (error) {
    next(error);
  }
};
