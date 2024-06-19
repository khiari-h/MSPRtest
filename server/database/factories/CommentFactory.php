<?php

namespace Database\Factories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition()
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'content' => $this->faker->paragraph,
            'date' => $this->faker->dateTime,
        ];
    }
}
