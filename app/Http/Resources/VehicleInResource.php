<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleInResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'vehicle' => $this->whenLoaded('vehicles', fn() => $this->vehicles->plate_number),
            'parking_spot' => $this->parking_spot,
            'customer' => $this->whenLoaded('customers', fn() => $this->customers->name),
            'entry_time' => $this->entry_time,
            'created_at' => $this->created_at->format('d M Y'),
            'updated_at' => $this->updated_at->format('d M Y'),
        ];
    }
}
