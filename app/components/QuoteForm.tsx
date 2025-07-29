"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface QuoteFormProps {
  initialText?: string;
  initialAuthor?: string;
  quoteId?: string;
  submitLabel?: string;
}

export default function QuoteForm({
  initialText = "",
  initialAuthor = "",
  quoteId,
  submitLabel = "Submit",
}: QuoteFormProps) {
  const [text, setText] = useState(initialText);
  const [author, setAuthor] = useState(initialAuthor);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !author.trim()) {
      alert("Both fields are required.");
      return;
    }

    const method = quoteId ? "PUT" : "POST";
    const url = quoteId ? `/api/quotes/${quoteId}` : `/api/quotes`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, author }),
    });

    router.push("/");
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quote Text
          </label>
          <textarea
            className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
            placeholder="Enter your inspirational quote..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <input
            className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            placeholder="Who said this?"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
      >
        {submitLabel}
      </button>
    </form>
  );
}