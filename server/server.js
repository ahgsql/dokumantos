import cookieparser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connect from "./db.js";
const app = express();
//express cache ekle
import fs from "fs";
import Category from "./routes/category.js";
import Page from "./routes/page.js";

if (!fs.existsSync("./public/generatedimages")) {
  fs.mkdirSync("./public/generatedimages", { recursive: true });
}
dotenv.config();
connect();

// Middlewares
app.use(express.json());
app.use(cookieparser());
app.use(express.static("public"));
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:4000",
      "http://localhost:5173",
      "http://192.168.1.170:5173",
      "http://192.168.1.170:4000",
      "http://192.168.1.176:5173",
      "http://192.168.1.176:4000",
      "http://0.0.0.0:5173",
      "http://0.0.0.0:4000",
    ],
  })
);

//Routes
app.use("/category", Category);
app.use("/page", Page);

const port = process.env.PORT || 9000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
