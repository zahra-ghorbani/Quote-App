import { useEffect, useState } from "react";
import QuoteCard from "@/app/components/QuoteCard";
import SearchSortBar from "@/app/components/SearchSort";
import { Quote } from "@/app/types/quote";

export default function HomePage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    fetchQuotes();
  }, [page, search, sort]);

  const fetchQuotes = async () => {
    const res = await fetch(
      `/api/quotes?page=${page}&search=${search}&sort=${sort}`
    );
    const data = await res.json();
    setQuotes(data);
  };

  const handleSearchSort = (searchTerm: string, sortOrder: "newest" | "oldest") => {
    setSearch(searchTerm);
    setSort(sortOrder);
    setPage(1);
  };

  return (
    <div>
      <SearchSortBar onChange={handleSearchSort} />
      <div className="grid gap-4 p-4">
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>
    </div>
  );
}