import { NextApiRequest, NextApiResponse } from "next";
import { readQuotes, writeQuotes } from "@/app/lib/fileStore";
import { Quote } from "@/app/types/quote";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const quotes = readQuotes();
    return res.status(200).json(quotes);
  }

  if (req.method === "POST") {
    const { text, author } = req.body;
    if (!text || !author)
      return res.status(400).json({ message: "Text and author are required" });

    const newQuote: Quote = {
      id: Date.now().toString(),
      text,
      author,
      createdAt: new Date().toISOString(),
    };

    const quotes = readQuotes();
    quotes.unshift(newQuote);
    writeQuotes(quotes);

    return res.status(201).json(newQuote);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}