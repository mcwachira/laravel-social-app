<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
});

Route::get('/about', function () {
    return Inertia::render('about');
});


Route::get('/posts', [PostController::class, 'index']);
Route::get('/post/{id}', [PostController::class, 'show']);
