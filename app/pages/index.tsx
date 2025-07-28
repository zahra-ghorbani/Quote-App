import { useEffect, useState } from "react";
import { Quote } from "@/app/types/quote";
import QuoteCard from "@/app/components/QuoteCard";

export default function HomePage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    fetch("/api/quotes")
      .then((res) => res.json())
      .then(setQuotes);
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Quotes</h1>
      {quotes.map((q) => (
        <QuoteCard key={q.id} quote={q} />
      ))}
    </main>
  );
}