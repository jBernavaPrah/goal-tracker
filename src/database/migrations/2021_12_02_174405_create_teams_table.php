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
        Schema::create('teams', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('name');

            $table->timestamps();
            $table->softDeletes();

        });

        Schema::table('games', function (Blueprint $table) {
            $table->foreignId('team1_id')
                ->nullable()
                ->constrained('teams')
                ->nullOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('team2_id')
                ->nullable()
                ->constrained('teams')
                ->nullOnDelete()
                ->cascadeOnUpdate();
        });
    }


};
