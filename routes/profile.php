<?php

// Add this to routes/api.php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('/profile/update', [ProfileController::class, 'update'])
        ->name('profile.update');
    
    Route::get('/profile', [ProfileController::class, 'show'])
        ->name('profile.show');
    
    Route::delete('/profile/avatar', [ProfileController::class, 'deleteAvatar'])
        ->name('profile.avatar.delete');
});
