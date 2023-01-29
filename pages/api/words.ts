import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import Word from "@/models/wordModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectDb();
    } catch (error) {
      res.status(501).json(error);
    }

    try {
      const newWord = new Word(req.body);
      const word = await newWord.save();

      res.status(200).json(word);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    const level = req.query.level;

    try {
      await connectDb();
      if (level) {
        const words = await Word.find({ level: level });
        res.status(200).json(words);
      } else {
        const words = await Word.find();
        res.status(200).json(words);
      }
    } catch (error) {
      res.status(501).json(error);
    }
  } else {
    res.status(500).json("Not allowed!");
  }
}
