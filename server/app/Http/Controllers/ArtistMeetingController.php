<?php

namespace App\Http\Controllers;

use App\Models\ArtistMeeting;
use Illuminate\Http\Request;

class ArtistMeetingController extends Controller
{
    // Affiche toutes les rencontres d'artistes
    public function index()
    {
        $artistMeetings = ArtistMeeting::all();
        return response()->json($artistMeetings);
    }

    // Affiche une rencontre d'artiste spécifique
    public function show($id)
    {
        $artistMeeting = ArtistMeeting::find($id);

        if (!$artistMeeting) {
            return response()->json(['message' => 'Artist Meeting not found'], 404);
        }

        return response()->json($artistMeeting);
    }

    // Crée une nouvelle rencontre d'artiste
    public function store(Request $request)
    {
        $this->validate($request, [
            'artist' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|time',
            'venue' => 'required|string|max:255',
        ]);

        $artistMeeting = ArtistMeeting::create($request->all());
        return response()->json($artistMeeting, 201);
    }

    // Met à jour une rencontre d'artiste existante
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'artist' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'date' => 'sometimes|required|date',
            'time' => 'sometimes|required|time',
            'venue' => 'sometimes|required|string|max:255',
        ]);

        $artistMeeting = ArtistMeeting::find($id);

        if (!$artistMeeting) {
            return response()->json(['message' => 'Artist Meeting not found'], 404);
        }

        $artistMeeting->update($request->all());
        return response()->json($artistMeeting);
    }

    // Supprime une rencontre d'artiste
    public function destroy($id)
    {
        $artistMeeting = ArtistMeeting::find($id);

        if (!$artistMeeting) {
            return response()->json(['message' => 'Artist Meeting not found'], 404);
        }

        $artistMeeting->delete();
        return response()->json(['message' => 'Artist Meeting deleted']);
    }
}
