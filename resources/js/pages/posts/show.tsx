import AppLayout from "@/layouts/app-layout";
import {Post, Comment} from "@/types";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import CommentForm from "@/components/comment-form";
import CommentCard from "@/components/comment-card";
import {Deferred} from "@inertiajs/react";
import {useRef} from "react";

interface PostShowProps {
    post:Post
    comments:Comment[]
}

export default function PostsShow({post, comments}:PostShowProps) {

    const commentSectionRef = useRef<HTMLDivElement>(null);

    const handleCommentAdded = () => setTimeout(() => {
        commentSectionRef.current?.scrollIntoView({
            behavior:"smooth",
            block:"start"
        })
    }, 100)
    return (
<AppLayout>

    <div className="space-y-6">
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle className="text-2xl">
                    {post.title}
                </CardTitle>
                <CardDescription>
                    By {post.user?.name} on {" "} {new Date(post.created_at).toLocaleDateString()}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">
                    {post.body}
                </p>
            </CardContent>

        </Card>


    {/*    Comment Form  */}
        <CommentForm postId={post.id} onCommentAdded={() =>handleCommentAdded()}/>

    {/*    Comment Section  */}

        <div ref={commentSectionRef}>


<Deferred data="comments"
fallback={
    <div className="text-center py-8">
<p className="text-gray-500">
    Loading Comments ...
</p>

    </div>
}>


        <div className="space-y-4">
            {comments && comments.length > 0 ? (
                <div>

                    {comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment}/>
                    ))}
                </div>
            ): (<div className="text-cneter py-8">
            <p className="text-gray-500">
                No Comment Yet
            </p>
            </div>)}
        </div>
</Deferred>

        </div>
    </div>


</AppLayout>
    )
}
