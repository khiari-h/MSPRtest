<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'username' => $this->faker->userName,
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(), // Ajout de la colonne email_verified_at
            'password' => bcrypt('password'),
            'role' => $this->faker->randomElement(['admin', 'user']),
            'remember_token' => Str::random(10),
        ];
    }
}
