<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndexReturnsAllUsers()
    {
        User::factory()->count(5)->create();
        $response = $this->actingAs(User::factory()->create(), 'sanctum')->getJson('/api/users');
        $response->assertStatus(200)
                 ->assertJsonCount(6); // 5 utilisateurs créés + 1 utilisateur connecté
    }

    public function testShowReturnsSpecificUser()
    {
        $user = User::factory()->create();
        $response = $this->actingAs(User::factory()->create(), 'sanctum')->getJson("/api/users/{$user->id}");
        $response->assertStatus(200)
                 ->assertJson($user->toArray());
    }

    public function testStoreCreatesNewUser()
    {
        $userData = [
            'username' => 'testuser',
            'email' => 'testuser@example.com',
            'password' => 'password',
            'role' => 'user',
        ];
        $response = $this->actingAs(User::factory()->create(), 'sanctum')->postJson('/api/users', $userData);
        $response->assertStatus(201);
        $this->assertDatabaseHas('users', [
            'username' => 'testuser',
        ]);
    }

    public function testUpdateModifiesExistingUser()
    {
        $user = User::factory()->create();
        $updatedData = [
            'username' => 'updateduser',
            'email' => 'updateduser@example.com',
        ];
        $response = $this->actingAs(User::factory()->create(), 'sanctum')->putJson("/api/users/{$user->id}", $updatedData);
        $response->assertStatus(200);
        $this->assertDatabaseHas('users', $updatedData);
    }

    public function testDestroyDeletesUser()
    {
        $user = User::factory()->create();
        $response = $this->actingAs(User::factory()->create(), 'sanctum')->deleteJson("/api/users/{$user->id}");
        $response->assertStatus(204); // Vérifie que le statut retourné est 204.
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
