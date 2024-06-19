<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->increments('id');  // Utilisation de increments
            $table->unsignedInteger('user_id');  // Utilisation de unsignedInteger
            $table->text('content');
            $table->dateTime('date');
            $table->timestamps();

            // Définition de la clé étrangère
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->index('user_id');  // Ajout d'un index
        });
    }

    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
