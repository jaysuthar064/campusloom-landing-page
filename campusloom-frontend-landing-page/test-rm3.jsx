import React from 'react';
import { renderToString } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

async function run() {
  const res = await fetch('http://localhost:8883/wp-json/campusloom/v1/content');
  const data = await res.json();
  const privacy = data.legal.privacy;

  const html = renderToString(
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {privacy}
    </ReactMarkdown>
  );

  console.log(html.includes('<table>') ? "SUCCESS: TABLE RENDERED" : "FAILED: NO TABLE");
  console.log("Snippet:", html.substring(html.indexOf('We share data'), html.indexOf('We share data') + 500));
}
run();
