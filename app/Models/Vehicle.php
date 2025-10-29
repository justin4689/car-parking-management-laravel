<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{

    use HasFactory;


    protected $fillable = [
        'plate_number',
        'color',
        'brand',
        'model',
        'category_id',
        'customer_id',
    ];

    //

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function vehicleIns()
    {
        return $this->hasMany(VehicleIn::class);
    }
}
