<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'name' => fake()->randomElement(['Voiture', 'Moto', 'Camion', 'Bus']),
    'price_per_hour' => fake()->randomFloat(2, 100, 500), // entre 100 et 500 FCFA
    'price_per_day' => fake()->randomFloat(2, 1000, 5000)
        ];
    }
}
