import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Post } from "@/types/post";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function BlogCard({ post }: { post: Post }) {
	return (
		<article
			key={post.id}
			className="flex flex-col h-full overflow-hidden hover:shadow-lg"
		>
			<Card>
				<CardHeader className="pb-0">
					<CardTitle className="line-clamp-2 text-xl font-bold">
						{post.title.charAt(0).toUpperCase() + post.title.slice(1)}
					</CardTitle>
				</CardHeader>
				<CardContent className="py-4 flex-grow">
					<p className="line-clamp-3 text-gray-500">
						{post.body.charAt(0).toUpperCase() + post.body.slice(1)}
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
	);
}
