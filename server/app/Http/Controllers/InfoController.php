<?php

namespace App\Http\Controllers;

use App\Models\Info;
use Illuminate\Http\Request;

class InfoController extends Controller
{
    public function index()
    {
        return Info::all();
    }

    public function show($id)
    {
        return Info::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:191',
            'content' => 'required|string',
            'faq' => 'nullable|json',
        ]);

        $info = Info::create($validatedData);
        return response()->json($info, 201);
    }

    public function update(Request $request, $id)
    {
        $info = Info::findOrFail($id);
        $validatedData = $request->validate([
            'title' => 'string|max:191',
            'content' => 'string',
            'faq' => 'nullable|json',
        ]);

        $info->update($validatedData);
        return response()->json($info, 200);
    }

    public function delete($id)
    {
        $info = Info::findOrFail($id);
        $info->delete();
        return response()->json(null, 204);
    }
}
