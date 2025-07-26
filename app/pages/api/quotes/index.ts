import { NextApiRequest, NextApiResponse } from "next";
import { Quote } from "@/app/types/quote";
import { text } from "stream/consumers";

let quotes: Quote[] = [
    {
        id: '1',
        text: 'salaaaaaaaaam',
        author: 'me',
        createdAt: new Date().toDateString()
    }
];
