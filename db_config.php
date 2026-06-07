<?php
 = "localhost";
 = "portfolio_user";
 = "password";
 = "portfolio_db";

// Veritabanı bağlantısı oluştur
 = new mysqli(, , , );

// Bağlantıyı kontrol et
if (->connect_error) {
    die("Veritabanı bağlantısı başarısız: " . ->connect_error);
}
?>
