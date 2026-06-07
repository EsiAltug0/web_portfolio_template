<?php
$servername = "localhost";
$username = "esma";
$password = "123321";
 // Senin belirlediğin şifre
$dbname = "portfolio_db";

// Veritabanı bağlantısı oluştur
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Veritabanı bağlantısı başarısız: " . $conn->connect_error);
}
?>
