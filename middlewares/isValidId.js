import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

export default function isValidId(req, res, next) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not a valid id`));
  } else {
    next();
  }
}
