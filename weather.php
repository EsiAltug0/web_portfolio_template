<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$city = "Kirsehir";
$country = "TR";
$apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // OpenWeatherMap'ten ücretsiz alabilirsiniz: https://openweathermap.org/api

$apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={$city},{$country}&appid={$apiKey}&units=metric&lang=tr";

$weatherData = null;

// Gerçek API çağrısı
if ($apiKey !== "YOUR_OPENWEATHERMAP_API_KEY") {
    $context = stream_context_create([
        'http' => ['timeout' => 5]
    ]);
    $response = @file_get_contents($apiUrl, false, $context);

    if ($response !== false) {
        $data = json_decode($response, true);
        if ($data && isset($data['main'])) {
            $weatherData = [
                "city"        => $data['name'],
                "country"     => "Türkiye",
                "temperature" => round($data['main']['temp']),
                "feels_like"  => round($data['main']['feels_like']),
                "humidity"    => $data['main']['humidity'],
                "pressure"    => $data['main']['pressure'],
                "description" => ucfirst($data['weather'][0]['description']),
                "wind_speed"  => round($data['wind']['speed'] * 3.6), // m/s -> km/h
                "icon"        => $data['weather'][0]['icon'],
                "timestamp"   => date('Y-m-d H:i:s', $data['dt']),
                "source"      => "live"
            ];
        }
    }
}

// API anahtarı yoksa veya API başarısızsa demo veri
if (!$weatherData) {
    $weatherData = [
        "city"        => "Kırşehir",
        "country"     => "Türkiye",
        "temperature" => 24,
        "feels_like"  => 22,
        "humidity"    => 55,
        "pressure"    => 1015,
        "description" => "Parçalı Bulutlu",
        "wind_speed"  => 14,
        "icon"        => "02d",
        "timestamp"   => date('Y-m-d H:i:s'),
        "source"      => "demo"
    ];
}

echo json_encode($weatherData);
?>
