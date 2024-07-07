<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\ConcertController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ArtistMeetingController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\WordpressController;

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::resources([
        'users' => UserController::class,
        'stages' => StageController::class,
        'concerts' => ConcertController::class,
        'comments' => CommentController::class,
        'info' => InfoController::class,
        'partners' => PartnerController::class,
        'contacts' => ContactController::class,
        'artist_meetings' => ArtistMeetingController::class,
        'news' => NewsController::class,
    ]);
});

// Wordpress Routes
Route::prefix('wordpress')->group(function () {
    Route::get('map', [WordpressController::class, 'getMap']);
    Route::get('programs', [WordpressController::class, 'getPrograms']);
    Route::get('artists_meetings', [WordpressController::class, 'getArtistsMeetings']);
    Route::get('partners', [WordpressController::class, 'getPartners']);
});
