import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { Data as CollectionData } from "../types";

export type Data = CollectionData & {
  url: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const view = req.query.view as string;

  const { data } = await axios({
    method: "GET",
    url: `https://pdfhost.io/v/${view}_`,
  });
  const name = data.split("\"headline\": \"")[1].split("\",")[0];
  const thumb = `${data.split("\"image\": [\n      \"")[1].split("\"\n    ]")[0]}/thumb`;
  const url = `https://pdfhost.io${data.split("var DEFAULT_URL = '")[1].split("';")[0]}`;

  res.status(200).json({
    name, thumb, url, view
  });
};

export default handler;