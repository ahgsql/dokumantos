import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    categoryname: {
      type: String,
    },
    slug: {
      type: String,
    },
  },
  { collection: "categories" }
);

const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;
