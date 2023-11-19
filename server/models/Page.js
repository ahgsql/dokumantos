import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
    }
  },
  { collection: "pages",
  timestamps:true },
  
);

const pageModel = mongoose.model("page", pageSchema);
export default pageModel;
