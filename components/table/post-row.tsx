import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Post } from "@/types/post";
import { Loader, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export function PostRow({
	post,
	onEdit,
	onDelete,
}: {
	post: Post;
	onEdit: (id: number) => Promise<void>;
	onDelete: (id: number) => Promise<void>;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	return (
		<TableRow>
			<TableCell className="font-medium">{post.id}</TableCell>
			<TableCell className="font-medium">
				{post.title.charAt(0).toUpperCase() + post.title.slice(1)}
			</TableCell>
			<TableCell className="hidden md:table-cell text-muted-foreground">
				{post.body.slice(0, 60)}...
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="icon"
						onClick={async () => {
							setIsEditing(true);
							await onEdit(post.id);
							setIsEditing(false);
						}}
					>
						{isEditing ? (
							<Loader className="h-4 w-4" />
						) : (
							<Pencil className="h-4 w-4" />
						)}
						<span className="sr-only">Edit</span>
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-destructive"
						onClick={async () => {
							setIsDeleting(true);
							await onDelete(post.id);
							setIsDeleting(false);
						}}
					>
						{isDeleting ? (
							<Loader className="h-4 w-4" />
						) : (
							<Trash2 className="h-4 w-4" />
						)}
						<span className="sr-only">Delete</span>
					</Button>
				</div>
			</TableCell>
		</TableRow>
	);
}
