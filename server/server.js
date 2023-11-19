import dotenv from "dotenv";
import express from "express";
const app = express();
import cors from "cors";
import cookieparser from "cookie-parser";
import connect from "./db.js";

import Category from "./routes/category.js";
import Page from "./routes/page.js";

dotenv.config();
connect();

// Middlewares
app.use(express.json());
app.use(cookieparser());
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
