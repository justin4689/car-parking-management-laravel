<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Vehicle;
use App\Models\VehicleIn;
use App\Http\Resources\VehicleInResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleInController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
             $vehicleInsQuery = VehicleIn::with(['vehicle', 'customer']);

        # Capturing the total count before applying filters
        $totalCount = $vehicleInsQuery->count();

        if ($request->filled('search')) {
            $search = $request->search;

            $vehicleInsQuery->where(fn($query) =>
                $query->where('parking_spot', 'like', "%{$search}%")
            );
        }

        # Filtered Count
        $filteredCount = $vehicleInsQuery->count();

        $perPage = (int) ($request->perPage ?? 10);

        # Fetch All the Records
        if ($perPage === -1) {
            $allVehicleIns = $vehicleInsQuery->latest()->get();

            $vehicleIns = [
                'data'     => VehicleInResource::collection($allVehicleIns)->toArray($request),
                'total'    => $filteredCount,
                'per_page' => $perPage,
                'from'     => 1,
                'to'       => $filteredCount,
                'links'    => [],
            ];

        } else {
            $paginator = $vehicleInsQuery->latest()->paginate($perPage)->withQueryString();
            $paginator->getCollection()->transform(
                fn($vehicle) => (new VehicleInResource($vehicle))->toArray($request)
            );  

            $arr = $paginator->toArray();
            $vehicleIns = [
                'data'  => $arr['data'],
                'links' => $arr['links'],
                'from'  => $arr['from'],
                'to'    => $arr['to'],
                'total' => $arr['total'],
            ];
        }

        return Inertia::render('vehicleins/index', [
            'vehicleIns'      => $vehicleIns,
            'filters'       => $request->only(['search', 'perPage']),
            'totalCount'    => $totalCount,
            'filteredCount' => $filteredCount,
            'vehicles'    => Vehicle::select('id', 'plate_number')->orderBy('id')->get(),
            'customers'     => Customer::select('id', 'name' )->orderBy('name')->get(),
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
        'vehicle_id' => 'required|string|max:255 |exists:vehicles,id',
        'customer_id' => 'required|string|max:255 |exists:customers,id',
        'parking_spot' => 'required|string|max:255',
        'entry_time' => 'required|string|max:255',
    ]);

    $vehicleIn = VehicleIn::create($validated);

    return redirect()->route('vehicleIns.index')
        ->with('success', 'Vehicle In created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(VehicleIn $vehicleIn)
    {
        //
         
        // Ensure relations are loaded to avoid N+1
        $vehicleIn->load(['vehicle', 'customer']);
        return Inertia::render('vehicleins/show', [
            'vehicleIn' => (new VehicleInResource($vehicleIn))->toArray(request())
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VehicleIn $vehicleIn)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VehicleIn $vehicleIn)
    {
        //
        $validated = $request->validate([
        'vehicle_id' => 'required|string|max:255 |exists:vehicles,id',
        'customer_id' => 'required|string|max:255 |exists:customers,id',
        'parking_spot' => 'required|string|max:255',
        'entry_time' => 'required|string|max:255',
    ]);

        
    $vehicleIn->update($validated);

    return redirect()->route('vehicleIns.index')
        ->with('success', 'Vehicle In updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VehicleIn $vehicleIn)
    {
        //
        $vehicleIn->delete();

        return redirect()->route('vehicleIns.index')
            ->with('success', 'Vehicle In deleted successfully');
    }
}
