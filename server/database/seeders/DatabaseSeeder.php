<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UserSeeder::class,
            StageSeeder::class,
            ConcertSeeder::class,
            CommentSeeder::class,
            InfoSeeder::class,
            PartnerSeeder::class,
            ContactSeeder::class,
            ArtistMeetingSeeder::class,
            NewsSeeder::class,
        ]);
    }
}
