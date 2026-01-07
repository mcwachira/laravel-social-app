<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @method static inRandomOrder()
 */
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'bio',
        'avatar_path',
        'cover_photo_path',
        'is_private',
        'is_verified'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_private'=>'boolean',
        'is_verified'=>'boolean',
    ];

    // ============================================
    // RELATIONSHIPS
    // ============================================

    /**
     * Posts created by this user
     */
    public function posts(): HasMany{
        return $this->hasMany(Post::class);
    }

   /**
    * Comments made by this user
    */
    public function comments(): HasMany{
        return $this->hasMany(Comment::class);
    }

   /**
    * Items this user has liked
    */
    public function likes(): HasMany{
        return $this->hasMany(Like::class);
    }

    /**
     * Users who follow this user
     */

    public function followers():BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'follows',
            'following_id',
            'follower_id'
        )->withTimestamps();
    }


    /**
     * Users this user follows
     */

    public function following():BelongsToMany
    {

        return $this -> belongsToMany(
            User::class,
            'follows',
            'follower_id',
            'following_id'
        )->withTimestamps();
    }

    /*
     * Media uploaded by this user
     */

    public function media():HasMany
    {
        return $this -> hasMany(Media::class);
    }

    // ============================================
    // HELPER METHODS
    // ============================================

    /*
     * Check if the user is followed by another user
     */
    public function isFollowedBy(User $user):bool
    {
     return $this -> followers()->where('follower_id', $user -> id)-> exists();
    }

    /**
     * Check if this user follows another user
     */
    public function isFollowing(User $user): bool
    {
        return $this->following()->where('following_id', $user->id)->exists();
    }


    // ============================================
    // ACCESSORS
    // ============================================

    public function getAvatarUrlAttribute():string
    {
        return $this->avatar_path ? asset('storage/'.$this->avatar_path): 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&size=200';
    }

    /**
     * Get Cover PhOTO URL
     */

    public function getCoverPhotoUrlAttribute():?string
    {
        return $this -> cover_photo_path ? asset('storage/' . $this->cover_photo_path) : null;
    }

}
