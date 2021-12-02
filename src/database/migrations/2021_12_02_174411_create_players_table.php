<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('players', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->foreignId('team_id')->constrained('teams')->cascadeOnUpdate()->cascadeOnDelete();

            $table->string('name');

            $table->timestamps();
            $table->softDeletes();

        });
    }

};
