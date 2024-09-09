// "use client";
import { MDXRemote } from 'next-mdx-remote/rsc'
import Router from 'next/router'

export default async function RemoteMdxPage() {
  const res = await fetch('http://127.0.0.1:8088/chapter').then(response => response.json())
  const title = await res.chapter
  const markdown = await res.content

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 md:px-32 lg:px-64">
        <div className="prose max-w-none">
            <h1 className="text-4xl font-bold mb-4 text-center">{title}</h1>
            <MDXRemote source={markdown} />
        </div>
        <div className="fixed bottom-5 right-5 w-1/8 bg-gray-800 px-4 py-2 rounded-lg">
          <span className="bg-gray-800 text-white rounded-lg" onClick={() => Router.push('/mdx-page-remote')}>NEXT</span>
        </div>
    </div>
    )
}