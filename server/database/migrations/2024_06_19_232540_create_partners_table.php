<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartnersTable extends Migration
{
    public function up()
    {
        Schema::create('partners', function (Blueprint $table) {
            $table->increments('id'); 
            $table->string('name', 191);
            $table->string('category', 191);
            $table->string('logo', 191)->nullable();
            $table->timestamps();
            
             // Changer le moteur de stockage
             $table->engine = 'InnoDB'; 
        });
    }

    public function down()
    {
        Schema::dropIfExists('partners');
    }
}
