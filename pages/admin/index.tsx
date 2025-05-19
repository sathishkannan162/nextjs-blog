import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { sleep } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import type { Post } from "../../types/post";
import { PostRow } from "@/components/table/post-row";

export const getServerSideProps: GetServerSideProps = async () => {
	const authenticated = true; // NOTE: change to false to simulate non-admin users
	if (!authenticated) {
		return { redirect: { destination: "/", permanent: false } };
	}

	const res = await fetch("https://jsonplaceholder.typicode.com/posts");
	const posts: Post[] = await res.json();

	return { props: { posts: posts.slice(0, 10) } };
};


export default function AdminDashboard({ posts }: { posts: Post[] }) {
	const [postList, setPostList] = useState(posts);

	const handleDelete = async (id: number) => {
		await sleep(1000);
		toast.warning(`You have deleted blog ${id}`);
		setPostList(postList.filter((p) => p.id !== id));
	};

	const handleEdit = async (id: number) => {
		await sleep(1000);
		toast.success(`you have edited blog ${id}`);
		console.log(`post ${id} edited`);
	};

	return (
		<div className="min-h-screen w-full bg-gray-50">
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

						<div className="rounded-lg border bg-white">
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
											<PostRow
												key={post.id}
												post={post}
												onEdit={handleEdit}
												onDelete={handleDelete}
											/>
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
