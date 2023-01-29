import Word from "@/models/wordModel";
import connectDb from "@/utils/connectDb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  if (req.method === "PUT") {
    await connectDb();

    const updatedWord = await Word.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    res.status(200).json(updatedWord);
  } else if (req.method === "DELETE") {
    await Word.findByIdAndDelete(id);
    res.status(200).json("Word has been deleted");
  } else {
    res.status(500).json("Not allowed!");
  }
}
