<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index()
    {
        return Comment::all();
    }

    public function show($id)
    {
        return Comment::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'content' => 'required|string',
            'date' => 'required|date',
        ]);

        $comment = Comment::create($validatedData);
        return response()->json($comment, 201);
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);
        $validatedData = $request->validate([
            'user_id' => 'exists:users,id',
            'content' => 'string',
            'date' => 'date',
        ]);

        $comment->update($validatedData);
        return response()->json($comment, 200);
    }

    public function delete($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();
        return response()->json(null, 204);
    }
}
