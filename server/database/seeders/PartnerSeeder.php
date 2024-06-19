<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Partner;

class PartnerSeeder extends Seeder
{
    public function run()
    {
        Partner::factory()->create([
            'name' => 'Music Gear Inc.',
            'category' => 'Equipment',
            'logo' => 'musicgear_logo.png'
        ]);

        Partner::factory()->create([
            'name' => 'Sound Systems Ltd.',
            'category' => 'Sound',
            'logo' => 'soundsystems_logo.png'
        ]);

        Partner::factory()->create([
            'name' => 'Foodies Catering',
            'category' => 'Food',
            'logo' => 'foodies_logo.png'
        ]);

        Partner::factory()->create([
            'name' => 'TicketMaster',
            'category' => 'Tickets',
            'logo' => 'ticketmaster_logo.png'
        ]);
    }
}
