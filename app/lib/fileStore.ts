import fs from "fs";
import path from "path";
import { Quote } from "@/app/types/quote";

const filePath = path.join(process.cwd(), "data", "quotes.json");

export function readQuotes(): Quote[] {
  const fileData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileData);
}

export function writeQuotes(quotes: Quote[]) {
  fs.writeFileSync(filePath, JSON.stringify(quotes, null, 2), "utf8");
}