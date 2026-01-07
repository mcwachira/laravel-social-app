<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->morphs('mediable'); // For posts, comments, etc.
            $table->string('file_path');
            $table->string('file_name');
            $table->string('mime_type');
            $table->unsignedBigInteger('size'); // in bytes
            $table->unsignedInteger('order')->default(0); // For ordering multiple images
            $table->timestamps();
// Indexes
            $table->index(['mediable_id', 'mediable_type']);
            $table->index('user_id');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
