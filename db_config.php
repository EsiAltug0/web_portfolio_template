<?php
// Veritabanı bağlantı ayarları
define('DB_HOST', 'sql305.infinityfree.com');
define('DB_USER', 'if0_42141652');
define('DB_PASS', 'RowzqSd4zx');
define('DB_NAME', 'if0_42141652_portfolio_db');

// Oturum başlat (daha önce başlatılmamışsa)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Veritabanı bağlantısı
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Veritabanı bağlantısı başarısız."]));
}

// Karakter seti
$conn->set_charset("utf8mb4");
?>
