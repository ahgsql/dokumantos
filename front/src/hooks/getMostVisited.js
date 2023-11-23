import axios from "axios";

export default async function getMostVisited() {
  try {
    let data = await axios.get(
      import.meta.env.VITE_BASE_URL + "/page/mostClicked",
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
