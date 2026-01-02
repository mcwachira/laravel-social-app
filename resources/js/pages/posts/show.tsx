import AppLayout from "@/layouts/app-layout";
import {Post, Comment} from "@/types";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import CommentForm from "@/components/comment-form";
import CommentCard from "@/components/comment-card";
import {Deferred, usePoll} from "@inertiajs/react";
import {useRef} from "react";
import {toast} from "sonner";
import CommentList from "@/components/comment-list";

interface PostShowProps {
    post:Post
    comments:Comment[]
}

export default function PostsShow({post, comments}:PostShowProps) {

    const commentSectionRef = useRef<HTMLDivElement>(null);

    usePoll(10000, {
        only:["comments"]
    })

    const handleCommentAdded = () => setTimeout(() => {

        toast("Commend has been added", {
            description:"Your Comment is already added and visible"
        })
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
    <CommentList  comments={comments ?? []}/>

}>


        <CommentList comments={comments}/>
</Deferred>

        </div>
    </div>


</AppLayout>
    )
}
