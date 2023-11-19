import axios from "axios";
export default async function translate(text, from = "tr_TR", to = "en_GB") {
  const options = {
    method: "POST",
    url: "https://lingvanex-translate.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "lingvanex-translate.p.rapidapi.com",
    },
    data: {
      from,
      to,
      data: text,
      platform: "api",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
