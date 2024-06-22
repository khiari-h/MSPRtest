<?php

namespace App\Http\Controllers;

use App\Models\Concert;
use Illuminate\Http\Request;

class ConcertController extends Controller
{
    public function index()
    {
        return Concert::all();
    }

    public function show($id)
    {
        return Concert::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:191',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
            'stage_id' => 'required|exists:stages,id',
            'description' => 'nullable|string',
        ]);

        $concert = Concert::create($validatedData);
        return response()->json($concert, 201);
    }

    public function update(Request $request, $id)
    {
        $concert = Concert::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'string|max:191',
            'date' => 'date',
            'time' => 'date_format:H:i:s',
            'stage_id' => 'exists:stages,id',
            'description' => 'nullable|string',
        ]);

        $concert->update($validatedData);
        return response()->json($concert, 200);
    }

    public function destroy($id)
    {
        $concert = Concert::findOrFail($id);
        $concert->delete();
        return response()->json(null, 204);
    }
}
