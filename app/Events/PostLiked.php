<?php

namespace App\Events;

use App\Models\Post;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PostLiked
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Post $post;
    public User $likedBy;
    /**
     * Create a new event instance.
     */
    public function __construct(Post $post, User $likedBy)
    {
        $this->post = $post;
        $this->likedBy = $likedBy;
    }
}
