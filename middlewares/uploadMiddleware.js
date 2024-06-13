import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../cloudinaryConfig.js";
import path from "path";
import { nanoid } from "nanoid";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars",
    format: async (req, file) => "png",
    public_id: (req, file) => {
      const userId = req.user._id;
      console.log(file);
      const basename = path.basename(
        file.originalname,
        path.extname(file.originalname)
      );
      return `${userId}-${basename}-${nanoid()}`;
    },
  },
});

const upload = multer({ storage });

export default upload;
