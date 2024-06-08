import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const priorityList = ["Without priority", "Low", "Medium", "High"];

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for contact"],
    },
    description: {
      type: String,
      required: [true, "Set description for contact"],
    },
    pryority: {
      type: String,
      enum: priorityList,
      default: "Without priority",
      required: [true, "Set subscription for contact"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

cardSchema.post("save", handleMongooseError);

const Card = model("card", cardSchema);

export default Card;
