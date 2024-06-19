<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Stage;

class StageSeeder extends Seeder
{
    public function run()
    {
        Stage::factory()->create([
            'name' => 'Main Stage',
            'location' => 'Central Park'
        ]);

        Stage::factory()->create([
            'name' => 'Acoustic Stage',
            'location' => 'Downtown Plaza'
        ]);

        Stage::factory()->create([
            'name' => 'Electric Stage',
            'location' => 'East Side Arena'
        ]);

        Stage::factory()->create([
            'name' => 'Jazz Stage',
            'location' => 'West End Park'
        ]);
    }
}
