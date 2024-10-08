<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInfosTable extends Migration
{
    public function up()
    {
        Schema::create('infos', function (Blueprint $table) {
            $table->increments('id'); 
            $table->string('title', 191);
            $table->text('content');
            $table->json('faq')->nullable();
            $table->timestamps();
            
            // Changer le moteur de stockage
            $table->engine = 'InnoDB'; 
        });
    }

    public function down()
    {
        Schema::dropIfExists('infos');
    }
}
