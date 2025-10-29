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
        Schema::create('vehicle_outs', function (Blueprint $table) {
            $table->id();

            $table->foreignId('vehicle_in_id')->constrained()->cascadeOnDelete();
            $table->datetime('exit_time');
            $table->decimal('total_time');
            $table->decimal('total_amount');
            $table->enum('payment_status', ['paid', 'unpaid']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_outs');
    }
};
