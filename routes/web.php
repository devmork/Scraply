<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'home')->name('home');
Route::inertia('/login', 'Auth/Login')->name('login');
Route::inertia('/register', 'Auth/Register')->name('register');
