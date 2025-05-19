
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { Post } from '../../types/post';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await res.json();

  const paths = posts.slice(0, 10).map(post => ({
    params: { id: post.id.toString() },
  }));
  console.log('paths', paths)

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.id}`);
  if (!res.ok) return { notFound: true };
  const post: Post = await res.json();
  return { props: { post } };
};

export default function BlogDetail({ post }: { post: Post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.body.slice(0, 150)} />
      </Head>
      <div className="p-8">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="mt-4">{post.body}</p>
        <Link href="/" className="text-blue-500 mt-6 block">
          ← Back to Home
        </Link>
      </div>
    </>
  );
}
