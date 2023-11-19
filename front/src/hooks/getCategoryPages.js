import axios from "axios";

export default async function getCategoryPages(slug) {
  try {
    let data = await axios.get(
      import.meta.env.VITE_BASE_URL + "/category/" + slug,
      {
        withCredentials: true,
      }
    );
    if (data.data.success) {
      return data.data;
    }
  } catch (error) {
    return false;
  }
}
