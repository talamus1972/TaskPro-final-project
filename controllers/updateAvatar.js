import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";
// import cloudinaryConfig from "../cloudinaryConfig.js";
import fs from "fs/promises";

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File not provided" });
    }
    console.log(req.file);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    console.log(req.file.path);
    // cloudinaryConfig();
    const result = await cloudinary.uploader.upload(req.file.path);
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: result.url },
      { new: true }
    );
    console.log(user);
    await fs.unlink(req.file.path);
    res.json({ avatarURL: user.avatarURL });
  } catch (error) {
    console.error("Error in updateAvatar:", error);
    next(error);
  }
};
