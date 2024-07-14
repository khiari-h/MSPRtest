<?php

namespace App\Http\Controllers;

use App\Models\ConcertSchedule;
use Illuminate\Http\Request;

class ConcertScheduleController extends Controller
{
    public function index()
    {
        return ConcertSchedule::all();
    }

    public function show($id)
    {
        return ConcertSchedule::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
            'venue' => 'required|string|max:255',
        ]);

        $concertSchedule = ConcertSchedule::create($validatedData);
        return response()->json($concertSchedule, 201);
    }

    public function update(Request $request, $id)
    {
        $concertSchedule = ConcertSchedule::findOrFail($id);
        $validatedData = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'image' => 'nullable|string',
            'date' => 'date',
            'time' => 'date_format:H:i:s',
            'venue' => 'string|max:255',
        ]);

        $concertSchedule->update($validatedData);
        return response()->json($concertSchedule, 200);
    }

    public function destroy($id)
    {
        $concertSchedule = ConcertSchedule::findOrFail($id);
        $concertSchedule->delete();
        return response()->json(null, 204);
    }
}
