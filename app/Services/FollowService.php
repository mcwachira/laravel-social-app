<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;


class FollowService {

    /**
     * Follow a user safely

     */

    public function follow(User $actor, User $target):void
    {

        if($actor -> id === $target -> id){
            return;
        }

        if($actor -> isFollowing($target)){
            return;
        }


        DB::transaction(function () use ($actor, $target){
            $actor->following()->attach($target -> id);

            $actor->increment('following_count');
            $target->increment('followers_count');
    });
    }

    /**
     * Unfollow a user safely
     */

    public function unfollow(User $actor, User $target): void
    {
        if (! $actor->isFollowing($target)) {
            return;
        }

        DB::transaction(function () use ($actor, $target) {
            $actor->following()->detach($target->id);

            $actor->decrement('following_count');
            $target->decrement('followers_count');
        });
    }

    public function toggleFollow(User $actor, User $target): void
    {
        $actor->isFollowing($target)
            ? $this->unfollow($actor, $target)
            : $this->follow($actor, $target);
    }

}
