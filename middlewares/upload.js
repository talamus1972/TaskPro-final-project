import multer from "multer";
import path from "node:path";

const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("tmp"));
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);

    if (!req.user || !req.user._id) {
      return cb(new Error("User ID not found in request"));
    }

    const userId = req.user._id;
    cb(null, `${basename}-${userId}${extname}`);
  }
});

export const upload = multer({
  storage: multerConfig
});
