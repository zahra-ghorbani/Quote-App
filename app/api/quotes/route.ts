// app/api/quotes/route.ts
import { NextResponse } from "next/server";
import { getAllQuotes, saveQuote } from "@/app/lib/quotes";

export async function GET() {
  const quotes = await getAllQuotes();
  return NextResponse.json(quotes);
}

export async function POST(req: Request) {
  const { text, author } = await req.json();

  if (!text || !author) {
    return NextResponse.json({ message: "Both fields are required." }, { status: 400 });
  }

  const newQuote = await saveQuote({ text, author });
  return NextResponse.json(newQuote, { status: 201 });
}