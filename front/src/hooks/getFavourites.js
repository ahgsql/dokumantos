import axios from "axios";

export default async function getFavourites() {
  try {
    let data = await axios.get(
      import.meta.env.VITE_BASE_URL + "/page/favourites",
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
