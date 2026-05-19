<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisterUserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\JunkListing\PostJunkController;

// Public Routes
Route::get('/', fn() => Inertia::render('GuessLayout'))->name('guess-layout'); 

// Auth Routes
Route::get('/login', [LoginController::class, 'create'])->name('login');
Route::post('/login', [LoginController::class, 'store']);
Route::get('/register', [RegisterUserController::class, 'create'])->name('register');
Route::post('/register', [RegisterUserController::class, 'store']);

Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

// Protected Routes
Route::middleware('auth')->group(function () {
    Route::get('/role/select', fn() => Inertia::render('Auth/SelectRole'))->name('role.select');
    Route::post('/role/store', [RegisterUserController::class, 'storeRole'])->name('role.store');
    Route::get('/dashboard', fn() => Inertia::render('AuthenticatedLayout'))->name('dashboard');
    Route::get('/collector/pickups', fn () => Inertia::render('Collector/Pickups/Index'))->name('collector.pickups');
    Route::get('/collector/rates', fn () => Inertia::render('Collector/RatesBoard'))->name('collector.rates');
    Route::inertia('/listings/create', 'Listings/Create')->name('listings.create');
    Route::inertia('/profile', 'UserProfile/Profile')->name('profile');
    // PostJunk API Route
    Route::post('/api/create-junk', [PostJunkController::class, 'store']);
});




