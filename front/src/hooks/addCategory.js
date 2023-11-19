import axios from "axios";
import urlSlug from "url-slug";
import { randomIntFromInterval } from "./utils";

export async function addCategory(category, slug = "") {
  if (slug == "") {
    slug =
      urlSlug(category, {
        dictionary: { ç: "ç", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" },
      }) +
      "-" +
      randomIntFromInterval(100, 999);
  }
  const body = {
    categoryname: category,
    slug,
  };

  try {
    const createCat = await axios.post(
      import.meta.env.VITE_BASE_URL + "/category",
      body
    );
    return createCat.data.success;
  } catch (error) {
    console.error("Bir hata oluştu:", error);
    throw error; // Hata yakalanırsa, uygun şekilde işleyebilir veya yukarı katmana fırlatabilirsiniz.
  }
}
