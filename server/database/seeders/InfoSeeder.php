<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Info;

class InfoSeeder extends Seeder
{
    public function run()
    {
        Info::factory()->count(5)->create();
    }
}
