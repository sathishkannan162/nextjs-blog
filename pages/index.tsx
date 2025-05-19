// import { Geist, Geist_Mono } from "next/font/google";
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { Post } from '../types/post';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await res.json();
  return {
    props: { posts: posts.slice(0, 10) }, 
  };
};

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <>
      <Head>
        <title>Blog Home</title>
        <meta name="description" content="List of blog posts" />
      </Head>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.body.slice(0, 100)}...</p>
              <Link href={`/blog/${post.id}`} className="text-blue-500">
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
