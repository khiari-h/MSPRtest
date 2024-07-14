<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ConcertSchedule; 

class ConcertsScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ConcertSchedule::factory()->count(10)->create();
    }
}
