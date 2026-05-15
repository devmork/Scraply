<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\LoginController;

// Public pages
Route::get('/', fn() => Inertia::render('Home'))->name('home'); 

// Auth Routes
Route::get('/login', [LoginController::class, 'create'])->name('login');
Route::post('/login', [LoginController::class, 'store']);

Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store']);

// Logout
Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

// Protected routes (example)
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('profile/home'))->name('dashboard');
});

Route::inertia('/listings/create', 'Listings/Create')->name('listings.create');
