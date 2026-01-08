<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserFollowed
{
    use Dispatchable, SerializesModels;

    public User $follower;
    public User $following;

    public function __construct(User $follower, User $following)
    {
        $this->follower  = $follower;
        $this->following = $following;
    }
}
