import AppLayout from "@/layouts/app-layout";
import {Form} from "@inertiajs/react";
import {cn} from "@/lib/utils";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {InputError} from "@/components/input-error";

export default function PostCreate({}) {
    return (
<AppLayout>

  <Card  className="space-y-6">
<CardHeader>
    <CardTitle >
        Create Post
    </CardTitle>
</CardHeader>



     <CardDescription>
         <Form action="/posts" method="post" className="space-y-4">
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
                                aria-invalid={!!errors.title}/>


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
                                   aria-invalid={!!errors.body}/>
             <InputError message={errors.body}/>
                     </div>

                     <Button type="submit" className="w-full sm:w-auto">
                         Create Post
                     </Button>

                 </>
             )}
         </Form>
     </CardDescription>
  </Card>
</AppLayout>
    )
}
