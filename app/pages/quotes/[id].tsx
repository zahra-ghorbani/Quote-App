import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QuoteForm from "@/app/components/QuoteForm";
import { Quote } from "@/app/types/quote";

export default function QuoteDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/quotes/${id}`)
      .then((res) => res.json())
      .then((data) => setQuote(data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (text: string, author: string) => {
    const res = await fetch(`/api/quotes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, author }),
    });
    if (res.ok) {
      alert("Quote updated!");
      router.push("/");
    } else {
      alert("Failed to update.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/quotes/${id}`, { method: "DELETE" });
    router.push("/");
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!quote) return <p className="p-4">Quote not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Edit Quote</h2>
      <QuoteForm
        initialText={quote.text}
        initialAuthor={quote.author}
        onSubmit={handleUpdate}
        submitLabel="Update Quote"
      />
      <button
        onClick={handleDelete}
        className="text-red-600 underline mt-4 block"
      >
        Delete Quote
      </button>
    </div>
  );
}