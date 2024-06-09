import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

import Column from "./column.js";
import Card from "./card.js";

const iconsList = [
  "icon-roject",
  "icon-Icon",
  "icon-loading",
  "icon-puzzle-piece",
  "icon-cube",
  "icon-lightning",
  "icon-circles",
  "icon-pentagon",
];

const themeList = ["dark", "light", "violet"];

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for board"],
    },
    icon: {
      type: String,
      enum: iconsList,
      default: "roject",
      required: [true, "Set icon for board"],
    },
    background: {
      type: String,
    },
    theme: {
      type: String,
      enum: themeList,
      default: "dark",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.post("save", handleMongooseError);

boardSchema.pre("findOneAndDelete", async function (next) {
  const boardId = this.getQuery()._id;
  const columns = await Column.find({ board: boardId });

  for (const column of columns) {
    await Card.deleteMany({ column: column._id });
  }

  await Column.deleteMany({ board: boardId });

  next();
});

const Board = model("board", boardSchema);

export default Board;
