<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConcertSchedule extends Model
{
    use HasFactory;

    protected $table = 'concerts_schedule';

    protected $fillable = [
        'title',
        'description',
        'image',
        'date',
        'time',
        'venue',
    ];
}
