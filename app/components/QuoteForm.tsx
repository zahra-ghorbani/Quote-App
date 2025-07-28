"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuoteForm() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !author.trim()) {
      alert("Both fields are required.");
      return;
    }

    await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, author }),
    });

    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Enter quote text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Author name..."
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        Add Quote
      </button>
    </form>
  );
}