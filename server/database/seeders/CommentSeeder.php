<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;

class CommentSeeder extends Seeder
{
    public function run()
    {
        Comment::factory()->create([
            'user_id' => 1,
            'content' => 'Amazing concert! Really enjoyed the performance.',
            'date' => '2024-07-16 20:00:00'
        ]);

        Comment::factory()->create([
            'user_id' => 2,
            'content' => 'The venue was great, but the sound quality could have been better.',
            'date' => '2024-07-17 19:00:00'
        ]);

        Comment::factory()->create([
            'user_id' => 3,
            'content' => 'Loved the acoustic session. Very relaxing.',
            'date' => '2024-07-18 18:30:00'
        ]);

        Comment::factory()->create([
            'user_id' => 4,
            'content' => 'Jazz Night was fantastic. Great ambiance.',
            'date' => '2024-07-19 20:00:00'
        ]);
    }
}
