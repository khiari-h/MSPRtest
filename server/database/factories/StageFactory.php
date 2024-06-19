<?php

namespace Database\Factories;

use App\Models\Stage;
use Illuminate\Database\Eloquent\Factories\Factory;

class StageFactory extends Factory
{
    protected $model = Stage::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'location' => $this->faker->address,
        ];
    }
}
