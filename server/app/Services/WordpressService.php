<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WordpressService
{
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = 'https://nationsounds.online/wp-json/wp/v2/';
    }

    public function getData($endpoint)
    {
        $response = Http::get($this->baseUrl . $endpoint);
        return $response->json();
    }
}
