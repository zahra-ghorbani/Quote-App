import QuoteForm from "@/app/components/QuoteForm";

export default function NewQuotePage() {
  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Quote</h1>
      <QuoteForm />
    </main>
  );
}