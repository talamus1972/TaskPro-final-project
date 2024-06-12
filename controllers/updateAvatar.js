import User from "../models/user.js";

export const updateAvatar = async (req, res, next) => {
  try {
    console.log("req.user:", req.user); // Логирование пользователя
    console.log("req.file:", req.file); // Логирование файла

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
