<?php

namespace Database\Factories;

use App\Models\ConcertSchedule;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConcertScheduleFactory extends Factory
{
    protected $model = ConcertSchedule::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'image' => $this->faker->imageUrl(),
            'date' => $this->faker->date(),
            'time' => $this->faker->time(),
            'venue' => $this->faker->address,
        ];
    }
}
