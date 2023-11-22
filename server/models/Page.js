import mongoose from "mongoose";

const Schema = mongoose.Schema;
import delayResponse from "./delayResponsePlugin.js";

const pageSchema = new Schema(
  {
    categoryId: {
      type: Schema.ObjectId,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    slug: {
      type: String,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    favourited: {
      type: Boolean,
      default: false,
    },
    pageIcon: {
      type: Schema.Types.Mixed,
      default: {
        full: "",
        thumb: "",
        medium: "",
      },
    },
  },
  { collection: "pages", timestamps: true }
);
pageSchema.plugin(delayResponse);

const pageModel = mongoose.model("page", pageSchema);
export default pageModel;
