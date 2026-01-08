<?php

namespace App\Services;

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\DB;


class PostInteractionServices
{

    public function like(Post $post , User $user):void
    {

        if($post -> isLikedBy($user)){
            return ;
        }

        DB::transaction(function () use ($post, $user){
            $post->likes() -> create([
                'user_id' => $user -> id
            ]);
            $post -> increment('like_count');
        });


    }

    public function unlike(Post $post , User $user):void
    {

        if(!$post -> isLikedBy($user)){
            return ;
        }

        DB::transaction(function () use ($post, $user){
            $post->likes()->where('user_id', $user -> id)->delete();

            $post->decrement('like_count');
        });


    }
}
