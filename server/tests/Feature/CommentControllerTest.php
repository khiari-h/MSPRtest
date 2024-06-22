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
        $response = $this->getJson('/api/comments');
        $response->assertStatus(200)
                 ->assertJsonCount(5);
    }

    public function testShowReturnsSpecificComment()
    {
        $comment = Comment::factory()->create();
        $response = $this->get("/api/comments/{$comment->id}");
        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $comment->id,
                     'user_id' => $comment->user_id,
                     'content' => $comment->content,
                     'date' => $comment->date instanceof \DateTime ? $comment->date->format('Y-m-d H:i:s') : $comment->date, // Adjusted here
                 ]);
    }

    public function testStoreCreatesNewComment()
    {
        $user = User::factory()->create();
        $commentData = [
            'user_id' => $user->id,
            'content' => 'Test comment',
            'date' => now()->toDateString(),
        ];
        $response = $this->postJson('/api/comments', $commentData);
        $response->assertStatus(201);
        $this->assertDatabaseHas('comments', $commentData);
    }

    public function testUpdateModifiesExistingComment()
    {
        $comment = Comment::factory()->create();
        $updatedData = [
            'content' => 'Updated comment',
            'date' => now()->toDateString(),
        ];
        $response = $this->putJson("/api/comments/{$comment->id}", $updatedData);
        $response->assertStatus(200);
        $this->assertDatabaseHas('comments', $updatedData);
    }

    public function testDestroyDeletesComment()
    {
        $comment = Comment::factory()->create();
        $response = $this->deleteJson("/api/comments/{$comment->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
    }
}
