<?php

namespace Database\Factories;

use App\Models\Info;
use Illuminate\Database\Eloquent\Factories\Factory;

class InfoFactory extends Factory
{
    protected $model = Info::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
            'faq' => json_encode([$this->faker->sentence => $this->faker->paragraph]),
        ];
    }
}
