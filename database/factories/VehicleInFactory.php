<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VehicleIn>
 */
class VehicleInFactory extends Factory
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

            
            'vehicle_id' => Vehicle::inRandomOrder()->value('id'),
            'customer_id' => Customer::inRandomOrder()->value('id'),
            'entry_time' => fake()->dateTimeBetween('-1 month', 'now'),
            'parking_spot' => fake()->word(),
        ];
    }
}
