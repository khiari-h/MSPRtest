<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Concert extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'date',
        'time',
        'stage_id',
        'description',
    ];

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }
}
