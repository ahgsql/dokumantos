import axios from "axios";
import urlSlug from "url-slug";
import { randomIntFromInterval } from "./utils";
export async function addPage({
  category,
  title,
  markdown,

  newCategory,
}) {
  const body = {
    categoryId: category,
    title,
    content: markdown,
    slug:
      urlSlug(title, {
        dictionary: { ç: "ç", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" },
      }) +
      "-" +
      randomIntFromInterval(100, 999),
  };
  console.log(body);

  if (newCategory.length > 1) {
    const createCat = await axios.post(
      import.meta.env.VITE_BASE_URL + "/category",
      {
        categoryname: newCategory,
        slug:
          urlSlug(newCategory, {
            dictionary: { ç: "ç", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" },
          }) +
          "-" +
          randomIntFromInterval(100, 999),
      }
    );
    body.categoryId = createCat.data.data._id;
  }
  try {
    const result = await axios.post(
      import.meta.env.VITE_BASE_URL + "/page",
      body
    );

    return result.data; // Eğer server'dan bir yanıt bekliyorsanız, burada uygun bir değeri döndürebilirsiniz.
  } catch (error) {
    console.error("Bir hata oluştu:", error);
    throw error; // Hata yakalanırsa, uygun şekilde işleyebilir veya yukarı katmana fırlatabilirsiniz.
  }
}
