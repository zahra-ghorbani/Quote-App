// app/quotes/[id]/page.tsx

import { Quote } from "@/app/types/quote";
import QuoteForm from "@/app/components/QuoteForm";
import { getQuoteById } from "@/app/lib/quotes";

interface Props {
  params: { id: string };
}

export default async function EditQuotePage({ params }: Props) {
  const quote: Quote | null = await getQuoteById(params.id);

  if (!quote) {
    return <p className="text-center mt-8 text-red-600">Quote not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">Edit Quote</h1>
      <QuoteForm
        initialText={quote.text}
        initialAuthor={quote.author}
        quoteId={quote.id}
        submitLabel="Update Quote"
      />
    </div>
  );
}