
"use client";

import { Quote } from "@/app/types/quote";

export default function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <div className="border rounded p-4 shadow">
      <p className="text-lg">{quote.text}</p>
      <p className="text-sm text-right mt-2 text-gray-600">— {quote.author}</p>
    </div>
  );
}