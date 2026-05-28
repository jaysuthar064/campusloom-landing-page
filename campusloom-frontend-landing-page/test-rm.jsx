import React from 'react';
import { renderToString } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdown = `We share data with trusted third parties ONLY as necessary to provide our Service:

| Service | Purpose | Data Shared | Agreement |
|---|---|---|---|
| **Payment Gateway** | Fee processing | Transaction amount | DPA |`;

const html = renderToString(
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {markdown}
  </ReactMarkdown>
);

console.log(html);
