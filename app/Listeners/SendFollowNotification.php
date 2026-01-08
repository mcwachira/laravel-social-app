<?php

namespace App\Listeners;

use App\Events\UserFollowed;
use App\Notifications\UserFollowedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendFollowNotification implements ShouldQueue
{
    public function handle(UserFollowed $event): void
    {
        // Do not notify if user follows themselves (safety guard)
        if ($event->follower->id === $event->following->id) {
            return;
        }

        $event->following->notify(
            new UserFollowedNotification($event->follower)
        );
    }
}
