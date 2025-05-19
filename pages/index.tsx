import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import type { Post } from "../types/post";

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
										<article
											key={post.id}
											className="flex flex-col h-full overflow-hidden hover:shadow-lg"
										>
											<Card>
												<CardHeader className="pb-0">
													<CardTitle className="line-clamp-2 text-xl font-bold">
														{post.title.charAt(0).toUpperCase() +
															post.title.slice(1)}
													</CardTitle>
												</CardHeader>
												<CardContent className="py-4 flex-grow">
													<p className="line-clamp-3 text-gray-500">
														{post.body.charAt(0).toUpperCase() +
															post.body.slice(1)}
													</p>
												</CardContent>
												<CardFooter className="pt-0">
													<Link
														href={`/blog/${post.id}`}
														className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
													>
														Read more <ArrowRight className="h-4 w-4" />
													</Link>
												</CardFooter>
											</Card>
										</article>
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
