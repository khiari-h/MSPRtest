<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Concert;

class ConcertSeeder extends Seeder
{
    public function run()
    {
        Concert::factory()->create([
            'name' => 'Rock Night',
            'date' => '2024-07-15',
            'time' => '20:00:00',
            'stage_id' => 1,  // Assurez-vous que ces IDs correspondent à ceux créés par StageSeeder
            'description' => 'An electrifying night of rock music.'
        ]);

        Concert::factory()->create([
            'name' => 'Acoustic Evening',
            'date' => '2024-07-16',
            'time' => '18:00:00',
            'stage_id' => 2,
            'description' => 'A relaxing evening with acoustic tunes.'
        ]);

        Concert::factory()->create([
            'name' => 'Electric',
            'date' => '2024-07-17',
            'time' => '19:30:00',
            'stage_id' => 3,
            'description' => 'Electric beats.'
        ]);

        Concert::factory()->create([
            'name' => 'Jazz Night',
            'date' => '2024-07-18',
            'time' => '20:00:00',
            'stage_id' => 4,
            'description' => 'Smooth jazz to end your day.'
        ]);
    }
}
