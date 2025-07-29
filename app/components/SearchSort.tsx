
"use client";

import { useState } from "react";

interface Props {
  onChange: (search: string, sort: "newest" | "oldest") => void;
}

export default function SearchSortBar({ onChange }: Props) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onChange(value, sort);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "newest" | "oldest";
    setSort(value);
    onChange(search, value);
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search quotes..."
        className="flex-1 border p-2 rounded"
      />
      <select
        value={sort}
        onChange={handleSortChange}
        className="border p-2 rounded"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}