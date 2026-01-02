import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Form } from "@inertiajs/react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {InputError} from "@/components/input-error";
import {Button} from "@/components/ui/button";

export  interface CommentFormProps{
  postId:number
}


export default function CommentForm({postId}:CommentFormProps){
    return (
        <Card className='rounded-none'>
            <CardHeader>
                <CardTitle>
                    Add Comments
                </CardTitle>

                <CardDescription>
                    Share Your thoughts about this post
                </CardDescription>
            </CardHeader>
<CardContent>
    <Form action="/comments" method="post" className="space-y-4">
        {({ errors }) => (
            <>

                <Input type='hidden' name="post_id" value={postId}/>

                <div className="space-y-1">
                    <Textarea id="body"
                              name="body"
                              placeholder="Write your comment Here .."
                    aria-invalid={!!errors.body}/>

                    <InputError message={errors.body}/>
                </div>

                <Button>
                    Add Comment
                </Button>
            </>
        )}
    </Form>
</CardContent>

        </Card>
    )
}
