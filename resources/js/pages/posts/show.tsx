import AppLayout from "@/layouts/app-layout";
import {Post, Comment, PostLikesData} from "@/types";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import CommentForm from "@/components/comment-form";
import CommentCard from "@/components/comment-card";
import {Deferred, usePoll} from "@inertiajs/react";
import {useEffect, useRef} from "react";
import {toast} from "sonner";
import CommentList from "@/components/comment-list";
import LikeButton from "@/components/like-button";

interface PostShowProps {
    post:Post
    comments:Comment[]
    likes:PostLikesData
}

export default function PostsShow({post, comments, likes}:PostShowProps) {

    const commentSectionRef = useRef<HTMLDivElement>(null);
    const commentCountRef = useRef(comments?.length ?? 0);

    const iAmWritingComment = useRef(false)

    const scrollToComments = () =>   commentSectionRef.current?.scrollIntoView({
        behavior:"smooth",
        block:"start"
    })

    usePoll(3_000, {
        only:["comments", "likes"]
    })

    useEffect(() => {
        //current length of comments []
        const newCommentCount = comments?.length ?? 0;


        if(newCommentCount > commentCountRef.current && commentCountRef.current > 0 && !iAmWritingComment.current){
            toast('New comments available', {
                duration:6_000,
                action:{
                    label:"view Comment",
                    onClick:scrollToComments
                }
            })
        }
        //update the previous length to current length
        commentCountRef.current = newCommentCount;
        iAmWritingComment.current= false



    }, [comments])
    const handleCommentAdded = () => {
        iAmWritingComment.current= true;
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

            <CardContent className="space-y-4">
                <p className="text-gray-700 whitespace-pre-wrap">
                    {post.body}
                </p>

                <Deferred data="likes"
                          fallback={
                              <LikeButton postId={post.id} count={likes?.count} liked={likes?.user_has_liked} isLoading={!likes}/>

                          }>
                <LikeButton postId={post.id} count={likes?.count} liked={likes?.user_has_liked}/>

                </Deferred>
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
