<?php

namespace Database\Factories;
use App\Models\News;
use Illuminate\Database\Eloquent\Factories\Factory;

class NewsFactory extends Factory
{
    protected $model = News::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'link' => $this->faker->url,
            'image' => $this->faker->imageUrl(),
            'category' => $this->faker->randomElement(['concert', 'info', 'other']), // Utilisation des valeurs définies
            'importance' => $this->faker->numberBetween(1, 10),
        ];
    }
}

