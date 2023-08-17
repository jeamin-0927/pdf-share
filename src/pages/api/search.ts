import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "@/utils/db";

type Data = {
  name: string,
	thumb: string,
	url: string,
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) => {
  const { q } = req.query;

  const client = await connectToDatabase();
  const dataCollection = client.db().collection("data");

	type Collection = Data & { _id: string };

	const data: Collection[] = await dataCollection.find({ name: { $regex: q as string, $options: "i" } }).toArray();
  
	res.status(200).json(data);
};

export default handler;