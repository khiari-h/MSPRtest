<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Info;

class InfoSeeder extends Seeder
{
    public function run()
    {
        Info::factory()->create([
            'title' => 'Festival Guidelines',
            'content' => 'Please follow the guidelines to ensure a safe and enjoyable experience for everyone.',
            'faq' => json_encode([
                'What are the festival timings?' => 'The festival starts at 10:00 AM and ends at 10:00 PM.',
                'Are pets allowed?' => 'No, pets are not allowed at the festival.'
            ])
        ]);

        Info::factory()->create([
            'title' => 'Parking Information',
            'content' => 'There are several parking lots available near the venue. Parking is free for ticket holders.',
            'faq' => json_encode([
                'Where can I park?' => 'Parking lots are available at the north and south entrances.',
                'Is parking free?' => 'Yes, parking is free for ticket holders.'
            ])
        ]);
    }
}
