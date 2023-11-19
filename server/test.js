import connect from "./db.js";
import dotenv from "dotenv";
dotenv.config();

connect();
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gsmSchema = new Schema(
  {
    TC: {
      type: Number,
    },
    GSM: {
      type: Number,
    },
  },
  { collection: "gsm" }
);

const GsmModel = mongoose.model("GSM", gsmSchema);

(async () => {
  let data = await GsmModel.findOne({ TC: 38152450244 });
  console.log(data);
})();
