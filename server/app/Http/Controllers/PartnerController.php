<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    public function index()
    {
        return Partner::all();
    }

    public function show($id)
    {
        return Partner::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:191',
            'category' => 'required|string|max:191',
            'logo' => 'nullable|string|max:191',
        ]);

        $partner = Partner::create($validatedData);
        return response()->json($partner, 201);
    }

    public function update(Request $request, $id)
    {
        $partner = Partner::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'string|max:191',
            'category' => 'string|max:191',
            'logo' => 'nullable|string|max:191',
        ]);

        $partner->update($validatedData);
        return response()->json($partner, 200);
    }

    public function delete($id)
    {
        $partner = Partner::findOrFail($id);
        $partner->delete();
        return response()->json(null, 204);
    }
}
