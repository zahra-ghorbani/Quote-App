import QuoteCard from "./components/QuoteCard";
import { getAllQuotes } from "@/app/lib/quotes";
import QuoteForm from "./components/QuoteForm";



export default async function HomePage() {
  const quotes = await getAllQuotes();

  return (

    <main className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Quotes</h1>
      <QuoteForm />
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} quote={quote} />
        
        
      ))}
    </main>
  );
}