
import { useState } from "react";

interface QuoteFormProps {
  onSubmit: (text: string, author: string) => void;
  initialText?: string;
  initialAuthor?: string;
  submitLabel?: string;
}

export default function QuoteForm({
  onSubmit,
  initialText = "",
  initialAuthor = "",
  submitLabel = "Submit Quote",
}: QuoteFormProps) {
  const [text, setText] = useState(initialText);
  const [author, setAuthor] = useState(initialAuthor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !author.trim()) {
      alert("Both fields are required.");
      return;
    }
    onSubmit(text.trim(), author.trim());
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
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
}