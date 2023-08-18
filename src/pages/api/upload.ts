import axios from "axios";
import FormData from "form-data";
import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "@/utils/db";

import { Data } from "./types";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100000mb",
    },
  },
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { file, fileName } = req.body;

  const blob = Buffer.from(file.split(",")[1], "base64");

  const formData = new FormData();
  formData.append("file", blob, fileName);

  const { data: uploadData } = await axios({
    method: "POST",
    url: "https://pdfhost.io/api/upload",
    data: formData,
    headers: {
      ...formData.getHeaders(),
      "Origin": "https://pdfhost.io",
      "Referer": "https://pdfhost.io/"
    },
  });
  const view = uploadData.view_link;
  const { data } = await axios({
    method: "GET",
    url: `https://pdfhost.io/v/${view}_`,
  });
  const name = data.split("\"headline\": \"")[1].split("\",")[0];
  const thumb = `${data.split("\"image\": [\n      \"")[1].split("\"\n    ]")[0]}/thumb`;
  const url = `https://pdfhost.io${data.split("var DEFAULT_URL = '")[1].split("';")[0]}`;

  const put = { name, thumb, url };

  const client = await connectToDatabase();
  const dataCollection = client.db().collection("data");
  await dataCollection.insertOne(put);

  res.status(200).json(put);
};

export default handler;