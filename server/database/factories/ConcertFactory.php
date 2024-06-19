<?php

namespace Database\Factories;

use App\Models\Concert;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConcertFactory extends Factory
{
    protected $model = Concert::class;

    public function definition()
    {
        return [
            'name' => $this->faker->sentence(3),
            'date' => $this->faker->date(),
            'time' => $this->faker->time(),
            'stage_id' => \App\Models\Stage::factory(),  // Assure que les stages sont générés pour les concerts
            'description' => $this->faker->paragraph,
        ];
    }
}
