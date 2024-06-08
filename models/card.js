import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const priorityList = ["Without priority", "Low", "Medium", "High"];

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for card"],
    },
    description: {
      type: String,
      required: [true, "Set description for card"],
    },
    priority: {
      type: String,
      enum: priorityList,
      default: "Without priority",
    },
    deadline: {
      type: String,
      required: [true, "Set deadline for card"],
    },
    column: {
      type: Schema.Types.ObjectId,
      ref: "column",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

cardSchema.post("save", handleMongooseError);



const Card = model("card", cardSchema);

export default Card;
