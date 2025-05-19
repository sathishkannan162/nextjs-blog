import { useRouter } from "next/router";
import { useState } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CreateBlog() {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/posts", {
				method: "POST",
				body: JSON.stringify({ title, body }),
				headers: { "Content-Type": "application/json" },
			});

			if (!response.ok) throw new Error("Failed to create post");

			toast("Success", {
				description: "Your blog has been published.",
				action: {
					label: "Undo",
					onClick: () => console.log("Undo"),
				},
			});

			router.push("/admin");
		} catch (error) {
			toast.warning("Error", {
				description: "Failed to create your blog post. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 w-full bg-gradient-to-b from-white to-gray-50 flex justify-center items-center">
			<div className="container max-w-4xl py-10">
				<Button
					variant="ghost"
					className="mb-6 flex items-center gap-2 font-medium text-lg"
					onClick={() => router.back()}
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Admin
				</Button>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Create Blog Post</CardTitle>
						<CardDescription>
							Create a new blog post to share with your audience
						</CardDescription>
					</CardHeader>

					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-6">
							<div className="space-y-2">
								<label htmlFor="title" className="text-sm font-medium">
									Title
								</label>
								<Input
									id="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder="Enter a compelling title..."
									className="w-full"
									required
								/>
							</div>

							<div className="space-y-2">
								<label htmlFor="body" className="text-sm font-medium">
									Content
								</label>
								<Textarea
									id="body"
									value={body}
									onChange={(e) => setBody(e.target.value)}
									placeholder="Write your blog post content here..."
									className="min-h-[300px] resize-y"
									required
								/>
							</div>
						</CardContent>

						<CardFooter className="flex justify-between border-t p-6">
							<Button
								type="button"
								onClick={() => router.push("/admin")}
								variant={"destructive"}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isSubmitting || !title.trim() || !body.trim()}
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Submitting...
									</>
								) : (
									"Publish Post"
								)}
							</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
}
