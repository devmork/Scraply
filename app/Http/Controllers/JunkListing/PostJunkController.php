<?php

namespace App\Http\Controllers\JunkListing;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Junk;

class PostJunkController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'integer', 'min:1'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'isFree' => ['required', 'boolean'],
            'pickupAvailability' => ['required', 'string'],
            'pickupLocation' => ['required', 'string'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
        ]);

        $junk = Junk::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'quantity' => $validated['quantity'],
            'price' => $validated['price'],
            'isFree' => $validated['isFree'],
            'pickupDate' => now()->toDateString(),
            'pickupTime' => now()->toTimeString(),
            'pickupAvailability' => $validated['pickupAvailability'],
            'pickupLocation' => $validated['pickupLocation'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
        ]);

        return response()->json([
            'message' => 'Listing posted successfully',
            'junk' => $junk,
        ], 201);
    }
}
