import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: { 'Content-Type': 'application/json' },
    });

    alert('Post created!');
    router.push('/admin');
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Create Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-2 w-full" required />
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Body" className="border p-2 w-full h-40" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
