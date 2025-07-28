
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
      alert("خطا در ذخیره‌سازی جمله");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Quote</h1>
      <QuoteForm onSubmit={handleSubmit} />
    </div>
  );
}