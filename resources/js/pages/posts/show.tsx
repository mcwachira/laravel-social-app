import AppLayout from "@/layouts/app-layout";
import {Post, Comment} from "@/types";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import CommentForm from "@/components/comment-form";
import CommentCard from "@/components/comment-card";
import {Deferred, usePoll} from "@inertiajs/react";
import {useEffect, useRef} from "react";
import {toast} from "sonner";
import CommentList from "@/components/comment-list";

interface PostShowProps {
    post:Post
    comments:Comment[]
}

export default function PostsShow({post, comments}:PostShowProps) {

    const commentSectionRef = useRef<HTMLDivElement>(null);
    const commentCountRef = useRef(comments?.length ?? 0);

    const scrollToComments = () =>   commentSectionRef.current?.scrollIntoView({
        behavior:"smooth",
        block:"start"
    })

    usePoll(3_000, {
        only:["comments"]
    })

    useEffect(() => {
        //current length of comments []
        const newCommentCount = comments?.length ?? 0;


        if(newCommentCount > commentCountRef.current && commentCountRef.current > 0){
            toast('New comments available', {
                duration:6_000,
                action:{
                    label:"view Comment",
                    onClick:scrollToComments
                }
            })
        }
        //update the previous length to current length
        commentCountRef.current = newCommentCount



    }, [comments])
    const handleCommentAdded = () => {
        toast("Comment has been added", {
            description: "Your comment is already live and visible",
        });
    };
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
