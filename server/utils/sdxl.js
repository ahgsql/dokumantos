import axios from "axios";
import fs from "fs";
import urlSlug from "url-slug";
export const textToImage = async (positive, negative) => {
  const path =
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + process.env.STABILITY_AI_KEY,
  };

  const body = {
    steps: 30,
    width: 1024,
    height: 1024,
    seed: 0,
    cfg_scale: 6,
    samples: 1,
    text_prompts: [
      {
        text: positive,
        weight: 1,
      },
      {
        text: negative,
        weight: -1,
      },
    ],
  };

  const response = await axios.post(path, body, { headers });

  if (response.status !== 200) {
    throw new Error(`Non-200 response: ${response.statusText}`);
  }
  let filePath;
  response.data.artifacts.forEach((image, index) => {
    filePath = `generatedimages/${
      urlSlug.convert(positive) + "_" + image.seed
    }.png`;
    fs.writeFileSync(
      "./public/" + filePath,
      Buffer.from(image.base64, "base64")
    );
  });
  return filePath;
};
