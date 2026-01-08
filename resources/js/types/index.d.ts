export interface Post{
    id:number;
    title:string;
        body:string;
        created_at:string;
        updated_at:string;
        user_id:sting;
        user?:User;
        comments?:Comment[];
        liked?:Like[];
        like_count?:number;
}


export interface User {
    id:number;
    name:string;
    email:string;
    created_at:string;
    updated_at:string;
    post?:Post[]
    comments?:Comment[]
}


export interface Comment{
    id:number;
    body:string;
    created_at:string;
    updated_at:string;
    post_id:number;
    user_id:number;
    post?:Post;
    user?:User;
}


export interface Like {
    id:number;
    post_id:number;
    ip_address:string;
    user_agent:string;
    created_at:string;
    updated_at:string;
}


export interface PostLikesData {
    count:number;
    user_has_liked:boolean
}


export interface PageProps {
    auth: {
        user: User | null;


        can: {
            post: {
                create: boolean
                edit: boolean
            }
        }

        flash:{
            success?:string;
            error:?string;
        }
    }
    [key:string]:any;
}
