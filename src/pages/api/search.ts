import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "@/utils/db";

import { Data } from "./types";

type Collection = Data & { _id: string };

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Collection[]>
) => {
  const { q } = req.query;

  const client = await connectToDatabase();
  const dataCollection = client.db().collection("data");

  const data = await dataCollection.find({ name: { $regex: q as string, $options: "i" } }).toArray() as Collection[];
  
  res.status(200).json(data);
};

export default handler;