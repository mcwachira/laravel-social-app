<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Query\Builder;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'visibility',
        'is_pinned'
    ];

    protected $casts = [
        'is_pinned' => 'boolean',
        'created_at' => 'datetime',
        'like_count' => 'integer',
        'comments_count' => 'integer',
    ];



    // ============================================
    // RELATIONSHIPS
    // ============================================

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany{
        return $this->hasMany(Comment::class);
    }

    public function likes(): MorphMany{
        return $this->morphMany(Like::class, 'likeable');
    }

    public function media(): MorphMany{
        return $this->morphMany(Media::class, 'mediable')->orderBy('order');
    }

    public function hashtags(): BelongsToMany{
        return $this->belongsToMany(Hashtag::class)->withTimestamps();
    }

    // ============================================
    // HELPER METHODS
    // ============================================

    public function isLikedBy(?User $user):bool
    {

        if(!$user) {
            return false;
        }

        return $this->likes()->where('user_id', $user -> id)->exists();
    }



    // ============================================
   // SCOPES
   // ============================================


    /*
     * Scopes for post visible to a user
     */

    public function scopeVisibleTo(Builder $query, ? User $user): Builder
    {

        if(!$user){
            return $query->where('visibility', 'public');
        }

        return $query->where(function ($q) use ($user){
            $q->where('visibility', 'public')->
            orWhere('user_id', $user->id)
                ->orWhere(function ($q2) use ($user) {
                    $q2->where('visibility', 'followers')
                        ->whereHas('user.followers', function ($q3) use ($user) {
                            $q3->where('follower_id', $user->id);
                        });
                });
        });
    }

    /**
     * Eager Load Common relationships
     */

    public function scopeWithEngagements(Builder $query): Builder
    {
        return $query-> with([
            'user:id,name,username,avatar_path,is_verified',
            'media:id,mediable_id,file_path,mime_type',
        ])->withCount(['likes', 'comments']);
    }

    /**
     * Get Posts for feed
     */

    public function scopeForFeed(Builder $query, User $user): Builder
    {
        $followingIds = $user->following()->pluck('following_id');
        $followingIds->push($user->id); // Include own posts
        return $query->whereIn('user_id', $followingIds)
            ->visibleTo($user)
            ->withEngagement()
            ->latest();
    }

}
