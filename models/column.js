import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";
import Card from "./card.js";

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for column"],
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

columnSchema.post("save", handleMongooseError);

columnSchema.pre("findOneAndDelete", async function (next) {
  const columnId = this.getQuery()._id;
  await Card.deleteMany({ column: columnId });
  next();
});

const Column = model("column", columnSchema);

export default Column;
