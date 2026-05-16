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
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->nullable()->after('email');
            $table->string('photo')->nullable()->after('role');
            $table->string('avatar_url')->nullable()->after('photo');
            $table->boolean('is_active')->default(false)->after('avatar_url');
            $table->boolean('is_verified')->default(false)->after('is_active');
            $table->string('phone')->nullable()->after('is_verified');
            $table->string('address')->nullable()->after('phone');
            $table->string('city')->nullable()->after('address');
            $table->string('state')->nullable()->after('city');
            $table->string('postal_code')->nullable()->after('state');
            $table->string('country')->nullable()->after('postal_code');
            $table->text('bio')->nullable()->after('country');
            $table->decimal('rating', 4, 2)->nullable()->after('bio');
            $table->unsignedInteger('total_transactions')->default(0)->after('rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role',
                'photo',
                'avatar_url',
                'is_active',
                'is_verified',
                'phone',
                'address',
                'city',
                'state',
                'postal_code',
                'country',
                'bio',
                'rating',
                'total_transactions',
            ]);
        });
    }
};
