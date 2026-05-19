<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Junk Owner (Seller)
        User::create([
            'name' => 'John Seller',
            'email' => 'seller@gmail.com',
            'password' => Hash::make('seller123'),
            'role' => 'seller',
            'phone' => '+63 9123456789',
            'address' => '123 Junk Street',
            'city' => 'Davao City',
            'state' => 'Davao del Sur',
            'postal_code' => '8000',
            'country' => 'Philippines',
            'bio' => 'I have lots of junk to sell',
            'photo' => null,
            'avatar_url' => null,
            'is_active' => true,
            'is_verified' => true,
            'email_verified_at' => now(),
        ]);

        // Collector
        User::create([
            'name' => 'Jane Collector',
            'email' => 'collector@gmail.com',
            'password' => Hash::make('collector123'),
            'role' => 'collector',
            'phone' => '+63 9987654321',
            'address' => '456 Collection Ave',
            'city' => 'Davao City',
            'state' => 'Davao del Sur',
            'postal_code' => '8000',
            'country' => 'Philippines',
            'bio' => 'I collect recyclables for a living',
            'photo' => null,
            'avatar_url' => null,
            'is_active' => true,
            'is_verified' => true,
            'email_verified_at' => now(),
        ]);

        // Shop Owner
        User::create([
            'name' => 'Mike Shop Owner',
            'email' => 'shopowner@gmail.com',
            'password' => Hash::make('shopowner123'),
            'role' => 'shop',
            'phone' => '+63 9555666777',
            'address' => '789 Shop District',
            'city' => 'Davao City',
            'state' => 'Davao del Sur',
            'postal_code' => '8000',
            'country' => 'Philippines',
            'bio' => 'Welcome to our junk shop',
            'photo' => null,
            'avatar_url' => null,
            'is_active' => true,
            'is_verified' => true,
            'email_verified_at' => now(),
        ]);
    }
}
