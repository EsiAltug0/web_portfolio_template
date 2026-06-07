<?php
header('Content-Type: application/json');

// OpenWeatherMap API kullanarak hava durumu bilgisi al
// Kırşehir, Türkiye için hava durumu verisi

$city = "Kirsehir";
$country = "TR";
$apiKey = "demo"; // Demo API key - gerçek kullanım için OpenWeatherMap API key gerekli

// Statik demo veri (gerçek API çağrısı yerine)
$weatherData = array(
    "city" => "Kırşehir",
    "country" => "Türkiye",
    "temperature" => 22,
    "feels_like" => 20,
    "humidity" => 65,
    "pressure" => 1013,
    "description" => "Açık Hava",
    "wind_speed" => 12,
    "icon" => "01d",
    "timestamp" => date('Y-m-d H:i:s')
);

// Gerçek API çağrısı için (API key gerekli):
/*
$apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={$city},{$country}&appid={$apiKey}&units=metric&lang=tr";

try {
    $response = file_get_contents($apiUrl);
    $data = json_decode($response, true);
    
    if ($data && isset($data['main'])) {
        $weatherData = array(
            "city" => $data['name'],
            "country" => $data['sys']['country'],
            "temperature" => round($data['main']['temp']),
            "feels_like" => round($data['main']['feels_like']),
            "humidity" => $data['main']['humidity'],
            "pressure" => $data['main']['pressure'],
            "description" => $data['weather'][0]['description'],
            "wind_speed" => round($data['wind']['speed']),
            "icon" => $data['weather'][0]['icon'],
            "timestamp" => date('Y-m-d H:i:s', $data['dt'])
        );
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("error" => "Hava durumu verisi alınamadı: " . $e->getMessage()));
    exit;
}
*/

echo json_encode($weatherData);
?>
