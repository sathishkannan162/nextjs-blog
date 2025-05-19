import type { GetStaticProps } from "next";
import Head from "next/head";
import type { Post } from "../types/post";
import { BlogCard } from "@/components/blog/blog-card";

export const getStaticProps: GetStaticProps = async () => {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts");
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
				<meta name="robots" content="index, follow" />
				<meta property="og:title" content="Blog Home" />
				<meta property="og:description" content="List of blog posts" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://sathishkannan.com" />
				<meta
					property="og:image"
					content="https://sathishkannan.com/og-image.jpg"
				/>
				<meta name="twitter:card" content="Blog page" />
				<meta name="twitter:title" content="Blog Home" />
				<meta name="twitter:description" content="List of blog posts" />
				<meta
					name="twitter:image"
					content="https://sathishkannan.com/og-image.jpg"
				/>
			</Head>

			<main className="w-full bg-gray-50">
				<div className="flex items-center justify-center">
					<div className="min-h-screen">
						<header className="w-full py-12 md:py-24 lg:py-32 border-b">
							<div className="container px-4 md:px-6">
								<div className="flex flex-col items-center justify-center space-y-4 text-center">
									<div className="space-y-2">
										<h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
											Welcome to Our Blog
										</h1>
										<p className="mx-auto text-gray-500 md:text-xl">
											Discover insightful blogs
										</p>
									</div>
								</div>
							</div>
						</header>

						<section className="w-full py-12 md:py-24">
							<div className="container px-4 md:px-6">
								<header className="mb-6">
									<h2
										id="latest-posts-heading"
										className="text-2xl font-bold md:text-3xl"
									>
										Latest Posts
									</h2>
								</header>

								<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
									{posts.map((post) => (
										<BlogCard key={post.id} post={post} />
									))}
								</div>
							</div>
						</section>
					</div>
				</div>
			</main>
		</>
	);
}
