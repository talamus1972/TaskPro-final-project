import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const genreList = ["Without priority", "Low", "Medium", "High"];

const contactSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set name for contact"],
    },
    description: {
      type: String,
      required: [true, "Set description for contact"],
    },
    subscription: {
      type: String,
      enum: genreList,
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

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

export default Contact;
