<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\LoginController;

// Public Routes
Route::get('/', fn() => Inertia::render('GuessLayout'))->name('guess-layout'); 

// Auth Routes
Route::get('/login', [LoginController::class, 'create'])->name('login');
Route::post('/login', [LoginController::class, 'store']);
Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store']);

Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

// Protected Routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('AuthenticatedLayout'))->name('dashboard');
});

Route::inertia('/listings/create', 'Listings/Create')->name('listings.create');
