import { ArrowLeft } from "lucide-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { Post } from "../../types/post";

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts");
	const posts: Post[] = await res.json();

	const paths = posts.slice(0, 10).map((post) => ({
		params: { id: post.id.toString() },
	}));

	return { paths, fallback: true }; 
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${params?.id}`,
	);
	if (!res.ok) return { notFound: true };
	const post: Post = await res.json();
	return { props: { post } };
};

export default function BlogDetail({ post }: { post: Post }) {
	const router = useRouter();

	if (router.isFallback) {
		return (
			<main className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6">
				<p className="text-lg text-gray-500 animate-pulse">Loading post...</p>
			</main>
		);
	}

	const body = post.body;
	const formattedTitle =
		post.title.charAt(0).toUpperCase() + post.title.slice(1);

	return (
		<>
			<Head>
				<title>{formattedTitle}</title>
				<meta name="description" content={body.slice(0, 100)} />
			</Head>

			<main className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6">
				<article className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 sm:p-10 hover:shadow-2xl">
					<Link
						href="/"
						className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-800 mb-6"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to all posts
					</Link>

					<header className="mb-8 border-b border-gray-200 pb-6">
						<h1 className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900">
							{formattedTitle}
						</h1>
					</header>

					<div className="prose prose-lg max-w-none text-gray-800">{body}</div>

					<div className="mt-12 pt-8 border-t border-gray-200" />
				</article>
			</main>
		</>
	);
}
