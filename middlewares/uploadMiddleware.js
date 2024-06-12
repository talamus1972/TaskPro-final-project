import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars",
    format: async (req, file) => "png",
    public_id: (req, file) => {
      const userId = req.user._id.toString(); // Получение userId
      const basename = path.basename(
        file.originalname,
        path.extname(file.originalname)
      ); // Базовое имя файла
      return `${basename}-${userId}`; // Формирование имени файла
    },
  },
});

const upload = multer({ storage });

export default upload;
