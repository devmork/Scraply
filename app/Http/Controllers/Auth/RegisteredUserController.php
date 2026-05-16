<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'name'     => $request->name ?? explode('@', $request->email)[0],
            'email'    => $request->email,
            'password' => $request->password,
            'role'     => null,                    // Role will be set later
        ]);

        Auth::login($user);

        // Redirect to Role Selection page after registration
        return redirect()->route('role.select');
    }
}