<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndexReturnsAllComments()
    {
        Comment::factory(5)->create();
        $response = $this->actingAs(User::factory()->create(), 'sanctum')->getJson('/api/comments');
        $response->assertStatus(200)
                 ->assertJsonCount(5); // Suppression de 'data' si la structure JSON ne l'utilise pas
    }

    public function testShowReturnsSpecificComment()
    {
        $comment = Comment::factory()->create();
        $response = $this->actingAs(User::factory()->create(), 'sanctum')->getJson("/api/comments/{$comment->id}");
        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $comment->id,
                     'user_id' => $comment->user_id,
                     'content' => $comment->content,
                     'date' => $comment->date->format('Y-m-d H:i:s'), // Modification pour correspondre au format attendu
                 ]);
    }

    public function testStoreCreatesNewComment()
    {
        $user = User::factory()->create();
        $commentData = [
            'user_id' => $user->id,
            'content' => 'Test comment',
            'date' => now()->toDateTimeString(), // Utilisation du format complet de date et heure
        ];
        $response = $this->actingAs(User::factory()->create(), 'sanctum')->postJson('/api/comments', $commentData);
        $response->assertStatus(201);
        $this->assertDatabaseHas('comments', $commentData);
    }

    public function testUpdateModifiesExistingComment()
    {
        $comment = Comment::factory()->create();
        $updatedData = [
            'content' => 'Updated comment',
            'date' => now()->toDateTimeString(), // Utilisation du format complet de date et heure
        ];
        $response = $this->actingAs(User::factory()->create(), 'sanctum')->putJson("/api/comments/{$comment->id}", $updatedData);
        $response->assertStatus(200);
        $this->assertDatabaseHas('comments', $updatedData);
    }

    public function testDestroyDeletesComment()
    {
        $comment = Comment::factory()->create();
        $response = $this->actingAs(User::factory()->create(), 'sanctum')->deleteJson("/api/comments/{$comment->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
    }
}
