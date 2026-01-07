<?php

namespace App\Listeners;

use App\Events\PostLiked;
use App\Notifications\PostLikedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendPostLikedNotification implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(PostLiked $event): void
    {
        $postOwner = $event->post->user;
        $likedBy   = $event->likedBy;

        // Do not notify if user likes their own post
        if ($postOwner->id === $likedBy->id) {
            return;
        }

        $postOwner->notify(
            new PostLikedNotification($likedBy, $event->post)
        );
    }
}
