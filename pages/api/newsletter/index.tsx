import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { connect, insertDocument } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const email = req.body;

    if (!email || !email.includes("@"))
      res.status(400).json({ error: "Email must be in a proper format" });

    let client: MongoClient | null = null;

    try {
      client = await connect();
    } catch (e: any) {
      res.status(500).json({ message: "Connect with database failed!" });
      return;
    }

    try {
      await insertDocument(client!, "emails", { email: email });
      client?.close();
    } catch (e: any) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Success", email });
  } else {
    res.status(200).json({ message: "Hello World" });
  }
}
