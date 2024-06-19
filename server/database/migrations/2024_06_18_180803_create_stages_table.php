<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStagesTable extends Migration
{
    public function up()
    {
        Schema::create('stages', function (Blueprint $table) {
            $table->increments('id');  
            $table->string('name', 191);
            $table->string('location', 191);
            $table->timestamps();
            
             // Changer le moteur de stockage
             $table->engine = 'InnoDB'; 
        });
    }

    public function down()
    {
        Schema::dropIfExists('stages');
    }
}
