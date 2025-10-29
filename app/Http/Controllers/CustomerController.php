<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
  
    public function index(Request $request)
    {
        $customersQuery = Customer::query();

        # Capturing the total count before applying filters
        $totalCount = $customersQuery->count();

        if ($request->filled('search')) {
            $search = $request->search;

            $customersQuery->where(fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
            );
        }

        # Filtered Count
        $filteredCount = $customersQuery->count();

        $perPage = (int) ($request->perPage ?? 10);

        # Fetch All the Records
        if ($perPage === -1) {
            $allCustomers = $customersQuery->latest()->get();

            $customers = [
                'data'     => CustomerResource::collection($allCustomers)->toArray($request),
                'total'    => $filteredCount,
                'per_page' => $perPage,
                'from'     => 1,
                'to'       => $filteredCount,
                'links'    => [],
            ];

        } else {
            $paginator = $customersQuery->latest()->paginate($perPage)->withQueryString();
            $paginator->getCollection()->transform(
                fn($customer) => (new CustomerResource($customer))->toArray($request)
            );

            $arr = $paginator->toArray();
            $customers = [
                'data'  => $arr['data'],
                'links' => $arr['links'],
                'from'  => $arr['from'],
                'to'    => $arr['to'],
                'total' => $arr['total'],
            ];
        }

        return Inertia::render('customers/index', [
            'customers'      => $customers,
            'filters'       => $request->only(['search', 'perPage']),
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
        $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:customers,email',
        'phone' => 'nullable|string|max:20',
        'address' => 'nullable|string|max:255',
    ]);

    $customer = Customer::create($validated);

    return redirect()->route('customers.index')
        ->with('success', 'Customer created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        return Inertia::render('customers/show', [
            'customer' => (new CustomerResource($customer))->toArray(request())
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        //

        
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:customers,email,' . $customer->id,
        'phone' => 'nullable|string|max:20',
        'address' => 'nullable|string|max:255',
    ]);

    $customer->update($validated);

    return redirect()->route('customers.index')
        ->with('success', 'Customer updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {

        $customer->delete();

        return redirect()->route('customers.index')
            ->with('success', 'Customer deleted successfully');
    }
}
