import { Router } from "express";

import Page from "../models/Page.js";
import CategoryModel from "../models/Category.js";

const router = Router();
router.get("/", async (req, res) => {
  try {
    const page = await Page.find();
    console.log(page);
    res.json({ success: true, data: page });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
