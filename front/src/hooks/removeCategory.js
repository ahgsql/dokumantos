import axios from "axios";

export async function removeCategory(id) {
  try {
    const remove = await axios.delete(
      import.meta.env.VITE_BASE_URL + "/category/" + id
    );
    return remove.data;
  } catch (error) {
    console.error("Bir hata oluştu:", error);
    throw error; // Hata yakalanırsa, uygun şekilde işleyebilir veya yukarı katmana fırlatabilirsiniz.
  }
}
