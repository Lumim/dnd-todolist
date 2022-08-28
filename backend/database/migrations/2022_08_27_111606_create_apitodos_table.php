<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apitodos', function (Blueprint $table) {
            $table->id('id',11);
            $table->longText('todo',30000)->nullable();
            $table->longText('task_in_progress',30000)->nullable();
            $table->longText('task_done',30000)->nullable();
            $table->timestamps();
            

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apitodos');
    }
};
