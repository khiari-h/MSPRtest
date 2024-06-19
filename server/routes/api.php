<?php
use App\Http\Controllers\UserController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\ConcertController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\PartnerController;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('stages', StageController::class);
    Route::resource('concerts', ConcertController::class);
    Route::resource('comments', CommentController::class);
    Route::resource('info', InfoController::class);
    Route::resource('partners', PartnerController::class);
});
