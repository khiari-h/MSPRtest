<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConcertsTable extends Migration
{
    public function up()
    {
        Schema::create('concerts', function (Blueprint $table) {
            $table->increments('id'); 
            $table->string('name', 191);
            $table->date('date');
            $table->time('time');
            $table->unsignedInteger('stage_id');  
            $table->text('description')->nullable();
            $table->timestamps();
            $table->foreign('stage_id')->references('id')->on('stages')->onDelete('cascade');
            $table->index('stage_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('concerts');
    }
}
