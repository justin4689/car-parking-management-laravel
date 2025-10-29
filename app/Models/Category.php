<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    //


    protected $fillable = [
        'name',
        'price_per_hour',
        'price_per_day',
    ];



    public function vehicles()
    {
        return $this->hasMany(Vehicle::class);
    }

}
