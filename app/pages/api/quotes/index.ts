import { NextApiRequest, NextApiResponse } from "next";
import { Quote } from "@/app/types/quote";


let quotes: Quote[] = [
    {
        id: '1',
        text: 'salaaaaaaaaam',
        author: 'me',
        createdAt: new Date().toDateString()
    }
];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return res.status(200).json(quotes);

    }
    if (req.method === 'POST') {
        const{text, author}=req.body;
       if(!text || !author)return res.status(400).json({message:'the information is incomplete'});

       const newQuote :Quote={
        id:Date.now().toString(),
        text,
        author,
        createdAt:new Date().toISOString()

       };
       quotes.push(newQuote);
       return res.status(201).json(newQuote);
    }
    res.setHeader('ALLOW',['GET','POST']);
    res.status(405).end(`metod${req.method} Not Allowed`)
}
