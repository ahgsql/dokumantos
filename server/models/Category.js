import mongoose from "mongoose";

const Schema = mongoose.Schema;

import delayResponse from "./delayResponsePlugin.js";

const categorySchema = new Schema(
  {
    categoryname: {
      type: String,
    },
    slug: {
      type: String,
    },
    catImage: {
      type: Schema.Types.Mixed,
      default: {
        full: "",
        thumb: "",
        medium: "",
      },
    },
  },
  { collection: "categories" }
);
//categorySchema.plugin(delayResponse);
const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;
