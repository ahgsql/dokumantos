import axios from "axios";

export async function updatePage(id, data) {
  try {
    const updated = await axios.put(
      import.meta.env.VITE_BASE_URL + "/page/" + id,
      data
    );
    return updated;
  } catch (error) {
    console.error("Bir hata oluştu:", error);
    throw error; // Hata yakalanırsa, uygun şekilde işleyebilir veya yukarı katmana fırlatabilirsiniz.
  }
}
