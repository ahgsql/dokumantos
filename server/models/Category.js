import mongoose from "mongoose";

const Schema = mongoose.Schema;

function loadedAtPlugin(schema, options) {
  schema
    .virtual("loadedAt")
    .get(function () {
      return this._loadedAt;
    })
    .set(function (v) {
      this._loadedAt = v;
    });

  schema.post(["find", "findOne"], function (docs) {
    if (!Array.isArray(docs)) {
      docs = [docs];
    }
    const now = new Date();
    for (const doc of docs) {
      doc.loadedAt = now;
    }
  });
}

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
categorySchema.plugin(loadedAtPlugin);
const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;
