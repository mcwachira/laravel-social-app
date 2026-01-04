import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreVertical, Pencil} from "lucide-react";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {Link} from "@inertiajs/react";
import {edit} from "@/actions/App/Http/Controllers/PostController";


interface PostActionDropdownProps {
    postId:number
    canUpdate:boolean;
    canDelete:boolean
}

export default  function PostActionsDropDown({
                                                 postId,
                                                 canUpdate,
                                                 canDelete,
                                             }:PostActionDropdownProps){


    if(!canUpdate  && !canDelete){
        return null
    }
    return (
         <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm">
        <MoreVertical className="h-4 w-4" />
        </Button>
</DropdownMenuTrigger>
    <DropdownMenuContent align="end">
        {canUpdate && (
            <DropdownMenuItem asChild>
                <Link href={edit(postId)}>
                    <Pencil />
                    Edit Post
                </Link>
            </DropdownMenuItem>
        )}
    </DropdownMenuContent>
</DropdownMenu>
    )
}
