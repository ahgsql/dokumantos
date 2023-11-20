import { Router } from "express";

import Jimp from "jimp";
import Category from "../models/Category.js";
import Page from "../models/Page.js";
import { textToImage } from "../utils/sdxl.js";
import translate from "../utils/translate.js";
const router = Router();

router.get("/:slug", async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { clickCount: 1 } }, // clickCount'u 1 artır
      { new: true } // Güncellenmiş dökümanı döndür
    );
    const catinfo = await Category.findById(page.categoryId);
    res.json({ success: true, data: page, categoryInfo: catinfo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.body.slug });
    if (page)
      return res.status(400).json({
        error: true,
        message: "Same Slug Page already exists",
      });

    let newPage = await new Page({ ...req.body }).save();
    res.status(200).json({ success: true, data: newPage });
    console.log(req.body.title);
    let ceviri = await translate(req.body.title, "tr_TR", "en_GB");
    let prompt =
      "Stunning desktop Icon ,   " +
      ceviri.result +
      ", digital art, illustrative, sketchy, Web Icon, flat bg";

    let image = await textToImage(
      prompt,
      "photo, photorealistic, realism, ugly"
    );

    newPage.pageIcon = image;
    await newPage.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
router.delete("/:id", async (req, res) => {
  const pageId = req.params.id;

  try {
    let page = await Page.findById(pageId);
    if (!page) {
      return res.status(404).json({ error: "Sayfa bulunamadı" });
    }
    await Page.findByIdAndDelete(pageId);
    res.status(200).json({ success: true, message: "Sayfa başarıyla silindi" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const pageId = req.params.id;
  const { title, content, slug } = req.body;
  try {
    let page = await Page.findById(pageId);
    if (!page) {
      return res.status(404).json({ error: "Sayfa bulunamadı" });
    }
    page.title = title || page.title;
    page.content = content || page.content;
    page.slug = slug || page.slug;
    await page.save();
    res.status(200).json({ success: true, data: page });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
