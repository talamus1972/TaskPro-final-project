import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "",
    format: async (req, file) => "png",
    public_id: (req, file) => "computed-filename-using-request", // Опционально: укажите логіку імені файлу
  },
});

const upload = multer({ storage });

export default upload;
