import { Router } from "express";

import Page from "../models/Page.js";
const router = Router();

router.get("/:slug", async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { clickCount: 1 } }, // clickCount'u 1 artır
      { new: true } // Güncellenmiş dökümanı döndür
    );

    res.json({ success: true, data: page });
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

    let newPage=await new Page({ ...req.body }).save();
    res.status(200).json({ success: true, data: newPage });
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
