import axios from "axios";

export default async function getCategories() {
  try {
    let data = await axios.get(
      import.meta.env.VITE_BASE_URL + "/category/all",
      {
        withCredentials: true,
      }
    );
    if (data.data.success) {
      console.log(data.data.data);
      return data.data.data;
    }
  } catch (error) {
    return false;
  }
}
