<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'mediable_id',
        'mediable_type',
        'file_path',
        'file_name',
        'mime_type',
        'size',
        'order',
    ];

    protected $casts = [
        'size' => 'integer',
        'order' => 'integer',
    ];

    protected $appends = ['url'];

    // ============================================
    // RELATIONSHIPS
    // ============================================

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function mediable(): MorphTo
    {
        return $this->morphTo();
    }

    // ============================================
    // ACCESSORS
    // ============================================

    public function getUrlAttribute(): string
    {
        return Storage::disk('public')->url($this->file_path);
    }
}
