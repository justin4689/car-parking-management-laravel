<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use App\Models\Customer;
use App\Models\Vehicle;
use App\Models\VehicleIn;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        Customer::factory()->count(100)->create();
        Category::factory()->count(4)->create();
        Vehicle::factory()->count(100)->create();
        VehicleIn::factory()->count(100)->create();
    }
}
