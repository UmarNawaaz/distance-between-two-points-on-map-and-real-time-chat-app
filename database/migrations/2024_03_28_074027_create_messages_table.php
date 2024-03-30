<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
          
            $table->text('message', 2000)->nullable(false);
          
            $table->unsignedBigInteger('sender_id')->nullable(false);
            $table->foreign('sender_id')->references('id')->on('users')->onDelete('cascade');
            
            $table->unsignedBigInteger('receiver_id')->nullable(false);
            $table->foreign('receiver_id')->references('id')->on('users')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
