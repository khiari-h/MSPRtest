<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');  // Utilisation de increments
            $table->string('username', 191);
            $table->string('password', 191);
            $table->string('email', 191);
            $table->enum('role', ['admin', 'user']);
            $table->timestamp('email_verified_at')->nullable(); // Ajout de la colonne email_verified_at
            $table->rememberToken();
            $table->timestamps();
            
            // Changer le moteur de stockage
            $table->engine = 'InnoDB'; 
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
