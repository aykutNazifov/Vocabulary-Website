import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      try {
        await connectDb();
      } catch (error) {
        res.status(500).json(error);
      }

      const { username, email, password } = req.body;
      const { code } = req.query;

      if (code === process.env.REGISTER_USER_CODE) {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPass });

        const user = await newUser.save();

        res.status(200).json({ user });
      } else {
        res.status(400).json("You dont have permision!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
