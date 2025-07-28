import fs from "fs/promises";
import path from "path";
import { Quote } from "@/app/types/quote";
import { v4 as uuid } from "uuid";

const filePath = path.join(process.cwd(), "public", "quotes.json");

export async function getAllQuotes(): Promise<Quote[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return []; 
  }
}

export async function saveQuote(data: { text: string; author: string }): Promise<Quote> {
  const allQuotes = await getAllQuotes();

  const newQuote: Quote = {
    id: uuid(),
    text: data.text,
    author: data.author,
    createdAt: new Date().toISOString(),
  };

  const updatedQuotes = [newQuote, ...allQuotes];

  await fs.writeFile(filePath, JSON.stringify(updatedQuotes, null, 2), "utf-8");

  return newQuote;
}