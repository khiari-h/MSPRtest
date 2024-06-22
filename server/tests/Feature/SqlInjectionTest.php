<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SqlInjectionTest extends TestCase
{
    use RefreshDatabase;

    public function testUserSqlInjection()
    {
        $user = User::factory()->create(); 
        $testCases = [
            "' OR '1'='1",
            "'; DROP TABLE users; --",
            "'; UPDATE users SET username = 'hacked' WHERE '1'='1'; --",
        ];

        foreach ($testCases as $testCase) {
            $response = $this->actingAs($user)->postJson('/api/users', [
                'username' => $testCase,
                'email' => 'testuser@example.com',
                'password' => 'password',
                'role' => 'user',
            ]);

            $response->assertStatus(422); // Validation should fail
            $this->assertDatabaseMissing('users', ['username' => $testCase]);
        }
    }
}
