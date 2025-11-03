<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
         $categoriesQuery = Category::query();

        # Capturing the total count before applying filters
        $totalCount = $categoriesQuery->count();

        if ($request->filled('search')) {
            $search = $request->search;

            $categoriesQuery->where(fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('price_per_hour', 'like', "%{$search}%")
                    ->orWhere('price_per_day', 'like', "%{$search}%")
            );
        }

        # Filtered Count
        $filteredCount = $categoriesQuery->count();

        $perPage = (int) ($request->perPage ?? 10);

        # Fetch All the Records
        if ($perPage === -1) {
            $allCategories = $categoriesQuery->latest()->get();

            $categories = [
                'data'     => CategoryResource::collection($allCategories)->toArray($request),
                'total'    => $filteredCount,
                'per_page' => $perPage,
                'from'     => 1,
                'to'       => $filteredCount,
                'links'    => [],
            ];

        } else {
            $paginator = $categoriesQuery->latest()->paginate($perPage)->withQueryString();
            $paginator->getCollection()->transform(
                fn($category) => (new CategoryResource($category))->toArray($request)
            );

            $arr = $paginator->toArray();
            $categories = [
                'data'  => $arr['data'],
                'links' => $arr['links'],
                'from'  => $arr['from'],
                'to'    => $arr['to'],
                'total' => $arr['total'],
            ];
        }

        return Inertia::render('categories/index', [
            'categories'      => $categories,
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
          //
        $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price_per_hour' => 'required|numeric',
        'price_per_day' => 'required|numeric',
    ]);

    $category = Category::create($validated);

    return redirect()->route('categories.index')
        ->with('success', 'Category created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
         return Inertia::render('categories/show', [
            'category' => (new CategoryResource($category))->toArray(request())
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
             
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price_per_hour' => 'required|numeric',
        'price_per_day' => 'required|numeric',
    ]);

    $category->update($validated);

    return redirect()->route('categories.index')
        ->with('success', 'Category updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
        $category->delete();

        return redirect()->route('categories.index')
            ->with('success', 'Category deleted successfully');
    }
}
