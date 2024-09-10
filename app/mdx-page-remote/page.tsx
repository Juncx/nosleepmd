// pages/index.tsx
"use client";

import { useEffect, useState } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

export default function Home() {
  const [mdxContent, setMdxContent] = useState<MDXRemoteSerializeResult | null>(null);
  const [markdownTitle, setMarkdownTitle] = useState('');

  const fetchMarkdown = async () => {
    const res = await fetch('http://127.0.0.1:8088/chapter');
    const data = await res.json();

    const serializedContent = await serialize(data.content);
    setMarkdownTitle(data.chapter);
    setMdxContent(serializedContent);
  };

  // Fetch markdown when the page loads
  useEffect(() => {
    fetchMarkdown();
  }, []);

  // Refresh the page
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 md:px-32 lg:px-64">
      <div className="prose max-w-none">
            <h1 className="text-4xl font-bold mb-4 text-center">{markdownTitle}</h1>
            {mdxContent && <MDXRemote {...mdxContent} />}
        </div>

      {/* Bottom left corner refresh button */}
      <div className="fixed bottom-5 right-5 w-1/8 bg-gray-800 px-4 py-2 rounded-lg" onClick={refreshPage} style={{ cursor: 'pointer' }}>
          {/* <span className="bg-gray-800 text-white rounded-lg" style={{ cursor: 'pointer' }} >NEXT</span> */}
          <span className="bg-gray-800 text-white rounded-lg">NEXT</span>
        </div>
    </div>
  );
}
