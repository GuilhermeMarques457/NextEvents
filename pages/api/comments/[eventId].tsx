import { connect, getAllDocuments, insertDocument } from "@/lib/db";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const eventId = req.query.eventId;

  let client: MongoClient | null = null;

  try {
    client = await connect();
  } catch (e: any) {
    res.status(500).json({ message: "Connect with database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });

      return;
    }

    try {
      const result = await insertDocument(client, "comments", {
        email: email,
        name: name,
        text: text,
        eventId: eventId,
      });
    } catch (e: any) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Comment Created" });
  }

  if (req.method === "GET") {
    try {
      const result = await getAllDocuments(client, "comments");
      res.status(200).json(result);
    } catch (e: any) {
      res.status(500).json({ message: "Getting comments failed!" });
      return;
    }
  }

  client.close();
  //   res.status(200).json({ feedback: selectedFeedback });
}
