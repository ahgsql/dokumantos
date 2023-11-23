import axios from "axios";

export async function changePageFavourited(id, favourited) {
  try {
    const updated = await axios.post(
      import.meta.env.VITE_BASE_URL + "/page/favourite/" + id,
      { favourited }
    );
    return updated;
  } catch (error) {
    console.error("Bir hata oluştu:", error);
    throw error; // Hata yakalanırsa, uygun şekilde işleyebilir veya yukarı katmana fırlatabilirsiniz.
  }
}
