<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'message' => 'Hello, Inertia!',
    ]);
});


Route::get('/about', function () {
    return Inertia::render('About', [
        'message' => 'Hello, Inertia!',
    ]);
});
