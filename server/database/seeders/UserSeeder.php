<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::factory()->create([
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);

        User::factory()->create([
            'username' => 'john_doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password'),
            'role' => 'user'
        ]);

        User::factory()->create([
            'username' => 'jane_doe',
            'email' => 'jane@example.com',
            'password' => bcrypt('password'),
            'role' => 'user'
        ]);

        User::factory()->create([
            'username' => 'user123',
            'email' => 'user123@example.com',
            'password' => bcrypt('password'),
            'role' => 'user'
        ]);
    }
}
