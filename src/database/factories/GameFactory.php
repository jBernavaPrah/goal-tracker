<?php

namespace Database\Factories;

use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'team1_id' => Team::factory(),
            'team2_id' => Team::factory(),
            'played_at' => $this->faker->dateTime
        ];
    }
}
