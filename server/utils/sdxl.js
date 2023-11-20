import axios from "axios";
import fs from "fs";
import urlSlug from "url-slug";
import FormData from "form-data";

import { v2 as cloudinary } from "cloudinary";
import { log } from "console";

cloudinary.config({
  cloud_name: "dh5zwck3u",
  api_key: "777266674272728",
  api_secret: "e0MpeKa6bUmtGJcXfMJxm95Usvc",
});

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

  let imgb64;
  let imgseed;
  response.data.artifacts.forEach(async (image, index) => {
    imgb64 = image.base64;
    imgseed = image.seed;
  });

  let result = await cloudinary.uploader.upload(
    "data:image/png;base64," + imgb64,
    { public_id: imgseed }
  );

  let imageBase = `v${result.version}/${result.public_id}.png`;

  return {
    full: "https://res.cloudinary.com/dh5zwck3u/image/upload/" + imageBase,
    thumb:
      "https://res.cloudinary.com/dh5zwck3u/image/upload/" +
      "c_scale,w_200/q_auto/" +
      imageBase,
    medium:
      "https://res.cloudinary.com/dh5zwck3u/image/upload/" +
      "c_scale,w_600/q_auto/" +
      imageBase,
  };
};
