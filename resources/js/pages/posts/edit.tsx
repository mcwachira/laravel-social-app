import AppLayout from "@/layouts/app-layout";
import {Form} from "@inertiajs/react";
import {cn} from "@/lib/utils";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {InputError} from "@/components/input-error";
import {update} from "@/actions/App/Http/Controllers/PostController";
import {Post} from "@/types";


interface PostsEditProps {
    post:Post
}
export default function PostEdit({post}:PostsEditProps) {


    return (
        <AppLayout>

            <Card  className="space-y-6">
                <CardHeader>
                    <CardTitle >
                        Edit Post
                    </CardTitle>

                    <CardDescription>
                        Edit an existing Posts
                    </CardDescription>
                </CardHeader>



                <CardDescription>
                    <Form action={update(post.id)} method="post" className="space-y-4">
                        {({errors})=> (

                            <>
                                <div className="space-y-1">
                                    <Label htmlFor="title">
                                        Title
                                    </Label>
                                    <Input type="text" id='title' name="title"
                                           className={cn(
                                               errors.title &&
                                               "border-destructive focus-visible:ring-destructive/20"
                                           )}
                                           aria-invalid={!!errors.title}
                                    defaultValue={post.title}

                                    />


                                    <InputError message={errors.title}/>
                                </div>



                                <div className="space-y-1">
                                    <Label htmlFor="title">
                                        Body
                                    </Label>
                                    <Textarea id='body' name="body"
                                              className={cn(
                                                  errors.title &&
                                                  "border-destructive focus-visible:ring-destructive/20"
                                              )}
                                              aria-invalid={!!errors.body}
                                    defaultValue={post.body}

                                    />
                                    <InputError message={errors.body}/>
                                </div>

                                <Button type="submit" className="w-full sm:w-auto">
                                   Update Post
                                </Button>

                            </>
                        )}
                    </Form>
                </CardDescription>
            </Card>
        </AppLayout>
    )
}
