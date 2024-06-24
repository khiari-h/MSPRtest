<?php

namespace App\Http\Controllers;

use App\Services\WordpressService;
use Illuminate\Http\Request;

class WordpressController extends Controller
{
    protected $wordpressService;

    public function __construct(WordpressService $wordpressService)
    {
        $this->wordpressService = $wordpressService;
    }

    public function getMap()
    {
        $data = $this->wordpressService->getData('concertmap');
        return response()->json($data);
    }

    public function getPrograms()
    {
        $data = $this->wordpressService->getData('programs');
        return response()->json($data);
    }

    public function getArtistsMeetings()
    {
        $data = $this->wordpressService->getData('artists_meetings');
        return response()->json($data);
    }

    public function getPartners()
    {
        $data = $this->wordpressService->getData('partners');
        return response()->json($data);
    }
}
