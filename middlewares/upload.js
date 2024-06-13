import multer from "multer";
import path from "node:path";

const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("tmp"));
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const basename = String(req.user._id) + extname;

    const userId = req.user._id;
    cb(null, `${basename}`);
  },
});

export const upload = multer({
  storage: multerConfig,
});
