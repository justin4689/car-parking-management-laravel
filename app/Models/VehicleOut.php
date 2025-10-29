<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleOut extends Model
{
    use HasFactory;


    public function vehicleIn()
    {
        return $this->belongsTo(VehicleIn::class);
    }
    //
}
