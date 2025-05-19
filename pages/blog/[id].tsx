import { ArrowLeft } from "lucide-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import type { Post } from "../../types/post";

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts");
	const posts: Post[] = await res.json();

	const paths = posts.slice(0, 10).map((post) => ({
		params: { id: post.id.toString() },
	}));

	return { paths, fallback: "blocking" };
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
	const body = post.body;
	const formattedTitle =
		post.title.charAt(0).toUpperCase() + post.title.slice(1);

	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name="description" content={post.body.slice(0, 100)} />
			</Head>

			<main className="w-full bg-gradient-to-b from-white to-gray-50">
				<article className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-10 bg-gradient-to-b from-white to-gray-50">
					<Link
						href="/"
						className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-8 transition-colors"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to all posts
					</Link>

					<header className="mb-10 border-b pb-8">
						<h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
							{formattedTitle}
						</h1>
					</header>

					<div className="prose prose-lg max-w-none">{body}</div>

					<div className="mt-12 pt-8 border-t">
					</div>
				</article>
			</main>
		</>
	);
}
