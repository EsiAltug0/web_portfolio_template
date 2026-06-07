<?php
// Veritabanı bağlantı ayarları
define('DB_HOST', 'localhost');
define('DB_USER', 'esma');       // MySQL kullanıcı adın
define('DB_PASS', '123321');     // MySQL şifren
define('DB_NAME', 'portfolio_db');

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
