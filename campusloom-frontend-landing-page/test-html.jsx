import React from 'react';
import { renderToString } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import fs from 'fs';

async function run() {
  const res = await fetch('http://localhost:8883/wp-json/campusloom/v1/content');
  const data = await res.json();
  const privacy = data.legal.privacy;

  const html = renderToString(
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {privacy}
    </ReactMarkdown>
  );

  fs.writeFileSync('test-output.html', html);
  console.log("Saved to test-output.html");
}
run();
