<?php


namespace Database\Factories;

use App\Models\ArtistMeeting;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArtistMeetingFactory extends Factory
{
    protected $model = ArtistMeeting::class;

    public function definition()
    {
        return [
            'artist' => $this->faker->name,
            'date' => $this->faker->date,
            'time' => $this->faker->time,
            'venue' => $this->faker->address,
            'description' => $this->faker->paragraph,
        ];
    }
}
