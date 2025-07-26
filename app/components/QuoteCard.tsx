import { Quote } from "../types/quote";

export default function QuoteCard({ quote }: { quote: Quote }) {
    return (
        <div className="border rounded-md p-4 shadow-sm hover:shadow-lg transition">

            <p className="text-lg font-semibold mb-2">'{quote.text}'</p>
            <p className="text-sm text-gray-500 text-right">-{quote.author}</p>
        </div>
    );
}