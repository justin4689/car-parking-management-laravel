<?php

namespace App\Http\Controllers;

use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
         $vehiclesQuery = Vehicle::with(['category', 'customer']);

        # Capturing the total count before applying filters
        $totalCount = $vehiclesQuery->count();

        if ($request->filled('search')) {
            $search = $request->search;

            $vehiclesQuery->where(fn($query) =>
                $query->where('plate_number', 'like', "%{$search}%")
            );
        }

        # Filtered Count
        $filteredCount = $vehiclesQuery->count();

        $perPage = (int) ($request->perPage ?? 10);

        # Fetch All the Records
        if ($perPage === -1) {
            $allVehicles = $vehiclesQuery->latest()->get();

            $vehicles = [
                'data'     => VehicleResource::collection($allVehicles)->toArray($request),
                'total'    => $filteredCount,
                'per_page' => $perPage,
                'from'     => 1,
                'to'       => $filteredCount,
                'links'    => [],
            ];

        } else {
            $paginator = $vehiclesQuery->latest()->paginate($perPage)->withQueryString();
            $paginator->getCollection()->transform(
                fn($vehicle) => (new VehicleResource($vehicle))->toArray($request)
            );  

            $arr = $paginator->toArray();
            $vehicles = [
                'data'  => $arr['data'],
                'links' => $arr['links'],
                'from'  => $arr['from'],
                'to'    => $arr['to'],
                'total' => $arr['total'],
            ];
        }

        return Inertia::render('vehicles/index', [
            'vehicles'      => $vehicles,
            'filters'       => $request->only(  ['search', 'perPage']),
            'totalCount'    => $totalCount,
            'filteredCount' => $filteredCount,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
             //
        $validated = $request->validate([
        'plate_number' => 'required|string|max:255|unique:vehicles,plate_number',
        'color' => 'required|string|max:255',
        'brand' => 'required|string|max:255',
        'model' => 'required|string|max:255',
        'category_id' => 'required|exists:categories,id',
        'customer_id' => 'required|exists:customers,id',
    ]);

    $vehicle = Vehicle::create($validated);

    return redirect()->route('vehicles.index')
        ->with('success', 'Vehicle created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicle $vehicle)



    {

        
        // Ensure relations are loaded to avoid N+1
        $vehicle->load(['category', 'customer']);
        return Inertia::render('vehicles/show', [
            'vehicle' => (new VehicleResource($vehicle))->toArray(request())
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicle $vehicle)
    {
        // Ensure relations are loaded to avoid N+1
        $vehicle->load(['category', 'customer']);
        return Inertia::render('vehicles/edit', [
            'vehicle' => (new VehicleResource($vehicle))->toArray(request())
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vehicle $vehicle)
    {
        //
        $validated = $request->validate([
        'plate_number' => 'required|string|max:255|unique:vehicles,plate_number',
        'color' => 'required|string|max:255',
        'brand' => 'required|string|max:255',
        'model' => 'required|string|max:255',
        'category_id' => 'required|exists:categories,id',
        'customer_id' => 'required|exists:customers,id',
    ]);

    $vehicle->update($validated);

    return redirect()->route('vehicles.index')
        ->with('success', 'Vehicle updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        //
        $vehicle->delete();

        return redirect()->route('vehicles.index')
            ->with('success', 'Vehicle deleted successfully');
    }
}

