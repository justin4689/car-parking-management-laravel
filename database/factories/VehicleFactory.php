<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
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
           'plate_number' => fake()->unique()->bothify('??-####'),
            'color' => fake()->randomElement(['Red', 'Blue', 'Green', 'Black', 'White']),
            'brand' => fake()->randomElement(['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW']),
            'model' => fake()->randomElement(['Camry', 'Civic', 'Mustang', 'Camaro', 'M3']),
           'category_id' => Category::inRandomOrder()->value('id'),
            'customer_id' => Customer::inRandomOrder()->value('id'),
        ];
    }
}
