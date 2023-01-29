import connectDb from "@/utils/connectDb";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    await connectDb();

    try {
      const user = await User.findOne({ username });

      if (!user) {
        res.status(400).json("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        res.status(200).json(user);
      } else {
        res.status(400).json("Username or password is wrong!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    res.status(200).json("work");
  } else {
    res.status(500).json("Not allowed!");
  }
}
