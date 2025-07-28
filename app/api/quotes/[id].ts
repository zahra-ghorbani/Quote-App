// // pages/api/quotes/[id].ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { readQuotes, writeQuotes } from "@/app/lib/quotes";
// import { Quote } from "@/app/types/quote";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;
//   const quotes = readQuotes();
//   const index = quotes.findIndex((q) => q.id === id);

//   if (index === -1) {
//     return res.status(404).json({ message: "Quote not found" });
//   }

//   if (req.method === "GET") {
//     return res.status(200).json(quotes[index]);
//   }

//   if (req.method === "PUT") {
//     const { text, author } = req.body;
//     if (!text || !author)
//       return res.status(400).json({ message: "Text and author are required" });

//     quotes[index] = { ...quotes[index], text, author };
//     writeQuotes(quotes);
//     return res.status(200).json(quotes[index]);
//   }

//   if (req.method === "DELETE") {
//     quotes.splice(index, 1);
//     writeQuotes(quotes);
//     return res.status(204).end();
//   }

//   res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
//   res.status(405).end(`Method ${req.method} Not Allowed`);
// }