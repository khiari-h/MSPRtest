<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('artist_meetings', function (Blueprint $table) {
            $table->id();
            $table->string('artist');
            $table->text('description');
            $table->date('date');
            $table->time('time');
            $table->string('venue');
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artist_meetings');
    }
};
