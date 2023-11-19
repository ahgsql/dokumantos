import axios from "axios";

export default async function removePage(id) {
  try {
    const remove = await axios.delete(
      import.meta.env.VITE_BASE_URL + "/page/" + id
    );
    return remove.data;
  } catch (error) {
    console.error("Bir hata oluştu:", error);
    throw error; // Hata yakalanırsa, uygun şekilde işleyebilir veya yukarı katmana fırlatabilirsiniz.
  }
}
