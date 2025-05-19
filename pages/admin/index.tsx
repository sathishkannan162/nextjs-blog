import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { Post } from '../../types/post';

export const getServerSideProps: GetServerSideProps = async () => {
  const authenticated = true; // change to false to simulate non-admin users
  if (!authenticated) {
    return { redirect: { destination: '/', permanent: false } };
  }

  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await res.json();

  return { props: { posts: posts.slice(0, 10) } };
};

export default function AdminDashboard({ posts }: { posts: Post[] }) {
  const [postList, setPostList] = useState(posts);

  const handleDelete = (id: number) => {
    setPostList(postList.filter(p => p.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Link href="/admin/create" className="text-green-600 mb-4 block">+ Create New Post</Link>
      <div className="space-y-4">
        {postList.map(post => (
          <div key={post.id} className="p-4 border rounded">
            <h2 className="text-xl">{post.title}</h2>
            <div className="space-x-2 mt-2">
              <button className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(post.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
