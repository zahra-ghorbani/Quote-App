import { useRouter } from "next/router";
import QuoteForm from "@/app/components/QuoteForm";

export default function NewQuotePage() {
  const router = useRouter();

  const handleSubmit = async (text: string, author: string) => {
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, author }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to submit quote.");
    }
  };

  return <QuoteForm onSubmit={handleSubmit} submitLabel="Add Quote" />;
}