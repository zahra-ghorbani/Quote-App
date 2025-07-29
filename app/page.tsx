import QuoteCard from "./components/QuoteCard";
import { getAllQuotes } from "@/app/lib/quotes";
import QuoteForm from "./components/QuoteForm";
import { getQuoteById } from "@/app/lib/quotes";
;


export default async function HomePage() {
  const quotes = await getAllQuotes();

  return (

    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Inspirational Quotes
          </h1>
          <p className="text-gray-600 text-lg">Share and discover meaningful words</p>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <QuoteForm submitLabel="Add Quote" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      </div>
    </main>
  );
}