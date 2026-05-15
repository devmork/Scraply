<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;

// Public pages
Route::get('/', fn() => Inertia::render('Home'))->name('home');   
// Auth Routes
Route::get('/login', fn() => Inertia::render('Auth/Login'))->name('login');
Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');

Route::post('/register', [RegisteredUserController::class, 'store']);

// Temporary Profile Home
Route::get('/profile/home', fn() => Inertia::render('profile/home'))->name('profile.home');

// Protected routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('profile/home'))->name('dashboard');
});