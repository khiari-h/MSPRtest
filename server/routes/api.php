<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\ConcertController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\WordpressController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('stages', StageController::class);
    Route::resource('concerts', ConcertController::class);
    Route::resource('comments', CommentController::class);
    Route::resource('info', InfoController::class);
    Route::resource('partners', PartnerController::class);
});

Route::get('/wordpress/map', [WordpressController::class, 'getMap']);
Route::get('/wordpress/programs', [WordpressController::class, 'getPrograms']);
Route::get('/wordpress/artists_meetings', [WordpressController::class, 'getArtistsMeetings']);
Route::get('/wordpress/partners', [WordpressController::class, 'getPartners']);
