import { Router } from "express";

import CategoryModel from "../models/Category.js";
import Page from "../models/Page.js";

const router = Router();

router.get("/all", async (req, res) => {
  try {
    const allCategories = await CategoryModel.find();

    res.json({ success: true, data: allCategories });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:slug", async (req, res) => {
  // o kategoriye ait sayfaları dönderir.
  try {
    let category = await CategoryModel.findOne({ slug: req.params.slug });

    const pagesofCategories = await Page.find({ categoryId: category._id });
    res.json({ success: true, pages: pagesofCategories, category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  // Adds new category

  try {
    let newCategory = await new CategoryModel({ ...req.body }).save();
    res
      .status(200)
      .json({ message: "Category added.", success: true, data: newCategory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put("/:id", async (req, res) => {
  const categoryId = req.params.id;

  const { categoryname, slug } = req.body;

  try {
    let category = await CategoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Kategori bulunamadı" });
    }

    category.categoryname = categoryname || category.categoryname;
    category.slug = slug || category.slug;

    await category.save();
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const categoryId = req.params.id;

  try {
    let category = await CategoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Kategori bulunamadı" });
    }

    await CategoryModel.findByIdAndDelete(categoryId);
    res
      .status(200)
      .json({ success: true, message: "Kategori başarıyla silindi" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
