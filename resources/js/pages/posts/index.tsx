import AppLayout from "@/layouts/app-layout";
import { Post } from "@/types";
import { Link } from "@inertiajs/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface PostsIndexProps {
    posts: Post[];
}

export default function PostsIndex({ posts }: PostsIndexProps) {
    console.log(posts)
    return (
        <AppLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
                {posts?.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No posts found.</p>
                    </div>
                ) : (
                    <div>
                        {posts.map((post) => (
                            <Card
                                key={post.id}
                                className="rounded-none border-b-0 last:border-b"
                            >
                                <CardHeader>
                                    <CardTitle>
                                        <Link href={`/post/${post.id}`}>
                                            {post.title}
                                        </Link>
                                    </CardTitle>
                                    <CardDescription>
                                        By {post.user.name}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="text-gray-600">
                                    {post.body.substring(0, 200)}
                                    {post.body.length > 200 && "..."}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
