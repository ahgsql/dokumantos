import { Router } from "express";

import Jimp from "jimp";
import CategoryModel from "../models/Category.js";
import Page from "../models/Page.js";
import { textToImage } from "../utils/sdxl.js";
import translate from "../utils/translate.js";
const router = Router();

router.get("/all", async (req, res) => {
  try {
    const allCategories = await CategoryModel.find();

    res.json({ success: true, data: allCategories });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/test", async (req, res) => {
  try {
    res.json({ success: true });
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
    let ceviri = await translate(req.body.categoryname, "tr_TR", "en_GB");
    console.log(ceviri);
    let prompt =
      "Flat 2D Art of  1  " +
      ceviri.result +
      "  dynamic graphic art, simple pastel colors, low saturated, " +
      ceviri.result +
      " is in the center of image, big, zoomed";

    let image = await textToImage(
      prompt,
      "ugly, deformed, noisy, blurry, drab, boring, moody"
    );
    newCategory.catImage = image;
    await newCategory.save();
  } catch (error) {
    console.log(error);
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
