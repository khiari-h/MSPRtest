<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function testCreateUser()
    {
        $user = User::factory()->create([
            'username' => 'testuser',
            'email' => 'testuser@example.com',
            'password' => bcrypt('password'),
            'role' => 'user',
        ]);

        $this->assertNotNull($user);
        $this->assertNotNull($user->id);
        $this->assertEquals('testuser', $user->username);
        $this->assertEquals('testuser@example.com', $user->email);
        $this->assertEquals('user', $user->role);
    }

    public function testUpdateUser()
    {
        $user = User::factory()->create();
    
        $newUsername = 'updateduser';
        $newEmail = 'updateduser@example.com';
        
        $user->update([
            'username' => $newUsername, 
            'email' => $newEmail,   
        ]);
    
        $user->refresh();
        
        $this->assertEquals($newUsername, $user->username);
        $this->assertEquals($newEmail, $user->email);
    }

    public function testDeleteUser()
    {
        $user = User::factory()->create();

        $id = $user->id;
        $user->delete();

        $this->assertNull(User::find($id));
    }
}
