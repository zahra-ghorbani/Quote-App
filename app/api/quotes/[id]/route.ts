import { NextRequest, NextResponse } from "next/server";
import { getAllQuotes } from "@/app/lib/quotes";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "public", "quotes.json");

// GET /api/quotes/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const quotes = await getAllQuotes();
  const quote = quotes.find((q) => q.id === params.id);

  if (!quote) {
    return NextResponse.json({ message: "Quote not found" }, { status: 404 });
  }

  return NextResponse.json(quote);
}

// PUT /api/quotes/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { text, author } = await req.json();
  if (!text || !author) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const quotes = await getAllQuotes();
  const updatedQuotes = quotes.map((q) =>
    q.id === params.id ? { ...q, text, author } : q
  );

  await fs.writeFile(filePath, JSON.stringify(updatedQuotes, null, 2), "utf-8");
  return NextResponse.json({ message: "Quote updated" });
}

// DELETE /api/quotes/[id]
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const quotes = await getAllQuotes();
  const filtered = quotes.filter((q) => q.id !== params.id);

  if (quotes.length === filtered.length) {
    return NextResponse.json({ message: "Quote not found" }, { status: 404 });
  }

  await fs.writeFile(filePath, JSON.stringify(filtered, null, 2), "utf-8");
  return NextResponse.json({ message: "Quote deleted" });
} 