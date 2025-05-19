import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Pencil, PlusCircle, Search, Trash2 } from "lucide-react";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import type { Post } from "../../types/post";

export const getServerSideProps: GetServerSideProps = async () => {
	const authenticated = true; // change to false to simulate non-admin users
	if (!authenticated) {
		return { redirect: { destination: "/", permanent: false } };
	}

	const res = await fetch("https://jsonplaceholder.typicode.com/posts");
	const posts: Post[] = await res.json();

	return { props: { posts: posts.slice(0, 10) } };
};

export default function AdminDashboard({ posts }: { posts: Post[] }) {
	const [postList, setPostList] = useState(posts);

	const handleDelete = (id: number) => {
		setPostList(postList.filter((p) => p.id !== id));
	};

	const handleEdit = (id: number) => {
		alert("you have editing the blog " + id);
		console.log(`post ${id} edited`);
	};

	return (
		<div className="min-h-screen bg-gray-50 w-full bg-gradient-to-b from-white to-gray-50">
			<div className="flex min-h-screen">
				<main className="flex-1 overflow-auto p-6 md:p-8">
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
							<div>
								<h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
							</div>
							<Link href="/admin/create">
								<Button className="w-full md:w-auto">
									<PlusCircle className="mr-2 h-4 w-4" />
									Create New Post
								</Button>
							</Link>
						</div>

						<div className="rounded-lg border bg-card">
							<div className="overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="w-12">ID</TableHead>
											<TableHead>Title</TableHead>
											<TableHead className="hidden md:table-cell">
												Content
											</TableHead>
											<TableHead className="w-[100px]">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{postList.map((post) => (
											<TableRow key={post.id}>
												<TableCell className="font-medium">{post.id}</TableCell>
												<TableCell className="font-medium">
													{post.title.charAt(0).toUpperCase() +
														post.title.slice(1)}
												</TableCell>
												<TableCell className="md:table-cell text-muted-foreground">
													{post.body.slice(0, 60)}...
												</TableCell>
												<TableCell>
													<div className="flex items-center gap-2">
														<Button
															variant="ghost"
															size="icon"
															onClick={() => handleEdit(post.id)}
														>
															<Pencil className="h-4 w-4" />
															<span className="sr-only">Edit</span>
														</Button>
														<Button
															variant="ghost"
															size="icon"
															className="text-destructive"
															onClick={() => handleDelete(post.id)}
														>
															<Trash2 className="h-4 w-4" />
															<span className="sr-only">Delete</span>
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
