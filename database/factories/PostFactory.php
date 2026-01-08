<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
          'content' => fake()->paragraph(rand(1,5)),
            'visibility'=> fake()->randomElement(['public', 'followers', 'private']),
            'is_pinned'=> fake()->boolean(5),
            'like_count' => 0,
            'comments_count' => 0,
            'created_at' => fake()->dateTimeBetween('-1 year', 'now')
        ];
    }
}
