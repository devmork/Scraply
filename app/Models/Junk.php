<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Junk extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'quantity',
        'unit',
        'price',
        'isFree',
        'pickupDate',
        'pickupTime',
        'pickupAvailability',
        'pickupLocation',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'isFree' => 'boolean',
        'pickupDate' => 'date',
        'latitude' => 'float',
        'longitude' => 'float',
    ];
}
