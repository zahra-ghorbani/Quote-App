// // pages/api/quotes/index.ts
// import { NextApiRequest, NextApiResponse } from "next";

// import { Quote } from "@/app/types/quote";

// const PAGE_SIZE = 10;

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     const page = parseInt(req.query.page as string) || 1;
//     const search = (req.query.search as string)?.toLowerCase() || "";
//     const sort = (req.query.sort as string) || "newest";

//     let quotes = readQuotes();

//     // فیلتر بر اساس سرچ
//     if (search) {
//       quotes = quotes.filter(
//         (q) =>
//           q.text.toLowerCase().includes(search) ||
//           q.author.toLowerCase().includes(search)
//       );
//     }

//     // مرتب‌سازی
//     quotes.sort((a, b) =>
//       sort === "oldest"
//         ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//         : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//     );

//     const start = (page - 1) * PAGE_SIZE;
//     const end = start + PAGE_SIZE;
//     return res.status(200).json(quotes.slice(start, end));
//   }
// }
 