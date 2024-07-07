<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ArtistMeeting;

class ArtistMeetingSeeder extends Seeder
{
    public function run()
    {
        ArtistMeeting::factory()->count(5)->create();
    }
}
