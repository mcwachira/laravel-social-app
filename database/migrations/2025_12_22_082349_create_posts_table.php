<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('content');
  $table->enum('visibility', ['public', 'followers', 'private'])->default('public');
$table->boolean('is_pinned')->default(false);

// Denormalized counts

            $table->unsignedInteger('like_count')->default(0);
            $table->unsignedInteger('comments_count')->default(0);
            $table->unsignedInteger('shares_count')->default(0);


            $table->timestamps();

            // Indexes for performance
            $table->index(['user_id', 'created_at']); // For user profile queries
            $table->index('created_at'); // For feed queries
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
