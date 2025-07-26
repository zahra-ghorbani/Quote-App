import { Quote } from "../types/quote";

export const allQuotes: Quote[] = Array.from({ length: 100 }).map((ـ, i) => ({

    id: (i + 1).toString(),
    text: `${i + 1}`,
    author: `author ${i % 5 + 1}`,
    createdAt: new Date(Date.now() - i * 1000000).toISOString(),
}));