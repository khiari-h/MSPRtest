<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArtistMeeting extends Model
{
    use HasFactory;

    protected $fillable = [
        'artist',
        'description',
        'date',
        'time',
        'venue',
        'image',
    ];
}

