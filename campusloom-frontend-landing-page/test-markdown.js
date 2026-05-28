import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

const markdown = `
| Service | Purpose | Data Shared | Agreement |
|---|---|---|---|
| **Payment Gateway** (Razorpay, PayU, etc.) | Fee processing | Transaction amount | DPA |
`;

remark()
  .use(remarkGfm)
  .use(html)
  .process(markdown)
  .then((file) => console.log(String(file)));
