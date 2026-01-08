<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Hashtag extends Model
{
    use HasFactory;

    //can be mass assigned
    protected $fillable = [
        'name',
    ];

    /*
     * Relationship
     */

    public function posts():BelongsToMany
    {
        return $this->belongsToMany(Post::class)->withTimestamps();
    }

    /*
     * Scopes
     */


    public function scopePopular(Builder $query): Builder
    {
        return $query-> orderByDesc('posts_count');
    }

    protected static function booted()
    {
        static ::saving(function ( $hashtag) {
            $hashtag->name = strtolower(trim($hashtag -> name));
        });
    }
}
