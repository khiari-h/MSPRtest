<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use Illuminate\Http\Request;

class StageController extends Controller
{
    public function index()
    {
        return Stage::all();
    }

    public function show($id)
    {
        return Stage::findOrFail($id);
    }

    public function store(Request $request)
    {
        $stage = Stage::create($request->all());
        return response()->json($stage, 201);
    }

    public function update(Request $request, $id)
    {
        $stage = Stage::findOrFail($id);
        $stage->update($request->all());
        return response()->json($stage, 200);
    }

    public function destroy($id)
    {
        $stage = Stage::findOrFail($id);
        $stage->delete();
        return response()->json(null, 204);
    }
}
