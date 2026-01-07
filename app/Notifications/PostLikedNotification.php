<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PostLikedNotification extends Notification
{
    use Queueable;

    protected User $likedBy;
    protected Post $post;

    /**
     * Create a new notification instance.
     */
    public function __construct(User $likedBy, Post $post)
    {
        $this->likedBy = $likedBy;
        $this->post = $post;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database']; //Scalable $ fast
    }

    /**
     * Store notification in database
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'post_liked',
            'liked_by_id' => $this->likedBy->id,
            'liked_by_username' => $this->likedBy->username,
            'post_id' => $this->post->id,
            'message' => "{$this->likedBy->username} liked your post",
        ];
    }
}
