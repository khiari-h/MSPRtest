<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user, 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|string|max:191|unique:users|regex:/^[a-zA-Z0-9_]+$/',
            'email' => 'required|string|email|max:191|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:admin,user',
        ]);
    
        $validatedData['password'] = Hash::make($validatedData['password']);
    
        $user = User::create($validatedData);
        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $validatedData = $request->validate([
            'username' => 'string|max:191|unique:users,username,' . $user->id . '|regex:/^[a-zA-Z0-9_]+$/',
            'email' => 'string|email|max:191|unique:users,email,' . $user->id,
            'password' => 'string|min:6',
            'role' => 'in:admin,user',
        ]);

        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);
        return response()->json($user, 200);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
}
