import { NextApiRequest, NextApiResponse } from "next";
import { Quote } from "@/app/types/quote";
import { allQuotes } from "@/app/lib/quote";

const PAGEـSIZE = 10;




export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const page = parseInt(req.query.page as string) || 1;
        const start = (page - 1) * PAGEـSIZE;
        const end = start + PAGEـSIZE;
        const paginated = allQuotes.slice(start, end);
        return res.status(200).json(paginated);
  
    } 
    if (req.method === 'POST') {
        const { text, author } = req.body;
        if (!text || !author) return res.status(400).json({ message: 'the information is incomplete' });

        const newQuote: Quote = {
            id: Date.now().toString(),
            text,
            author,
            createdAt: new Date().toISOString()

        };

        allQuotes.unshift(newQuote);

        return res.status(201).json(newQuote);
    }
    res.setHeader('ALLOW', ['GET', 'POST']);
    res.status(405).end(`metod${req.method} Not Allowed`)
}
