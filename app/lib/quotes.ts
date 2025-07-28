import fs from "fs/promises";
import path from "path";
import { Quote } from "@/app/types/quote";

const filePath = path.join(process.cwd(), "public", "quotes.json");

export async function getAllQuotes(): Promise<Quote[]> {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}