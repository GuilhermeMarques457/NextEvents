import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, name, text } = req.body;

    const feedbackId = req.query.id;

    const response = {
      feedbackId,
      email,
      name,
      text,
    };

    res.status(201).json({ message: "Success", response: response });
  } else {
    res.status(200).json({ message: "Hello World" });
  }

  //   res.status(200).json({ feedback: selectedFeedback });
}
