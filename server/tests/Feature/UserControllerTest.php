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
        User::factory(5)->create();
        $response = $this->get('/api/users');
        $response->assertStatus(200)
                 ->assertJsonCount(5, 'data');
    }

    public function testShowReturnsSpecificUser()
    {
        $user = User::factory()->create();
        $response = $this->get("/api/users/{$user->id}");
        $response->assertStatus(200)
                 ->assertJson($user->toArray());
    }

    public function testStoreCreatesNewUser()
    {
        $userData = [
            'username' => 'testuser',
            'email' => 'testuser@example.com',
            'password' => bcrypt('password'),
            'role' => 'user',
        ];
        $response = $this->post('/api/users', $userData);
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
        $response = $this->put("/api/users/{$user->id}", $updatedData);
        $response->assertStatus(200);
        $this->assertDatabaseHas('users', $updatedData);
    }

    public function testDestroyDeletesUser()
    {
        $user = User::factory()->create();
        $response = $this->delete("/api/users/{$user->id}");
        $response->assertStatus(200);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
