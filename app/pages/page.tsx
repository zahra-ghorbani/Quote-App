import { useState, useEffect, useRef } from "react";
import QuoteCard from "../components/QuoteCard";
import { Quote } from "../types/quote";

export default function Home() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [page, setPage] = useState(1);
    const loadRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch(`/api/quotes?page=${page}`)
            .then(res => res.json())
            .then(data => {
                setQuotes(prev => [...prev, ...data]);
            });
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1);
            }
        });
        if (loadRef.current) observer.observe(loadRef.current);
        return () => {
            if (loadRef.current) observer.unobserve(loadRef.current);
        };
    }, []);
    return(
        <main className="max-w-2xl max-auto p-4  space-y-4">
            {quotes.map(q =>(
                <QuoteCard key={q.id} quote={q} />
            ))}
            <div ref={loadRef} className="text-center py-4 text-gray-400">
                Loading...
            </div>
        </main>
    )


}