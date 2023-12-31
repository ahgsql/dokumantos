import axios from "axios";

export async function updateCategory(id, data) {
  try {
    const updateCat = await axios.put(
      import.meta.env.VITE_BASE_URL + "/category/" + id,
      data
    );
    return updateCat.data;
  } catch (error) {
    console.error("Bir hata oluştu:", error);
    throw error; // Hata yakalanırsa, uygun şekilde işleyebilir veya yukarı katmana fırlatabilirsiniz.
  }
}
