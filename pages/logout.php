<?php
// ============================================
// ÇIKIŞ İŞLEMİ
// Kullanıcı oturumunu sonlandırır
// ============================================
require_once __DIR__ . '/../includes/functions.php';

// Session'ı temizle
$_SESSION = [];

// Session cookie'sini sil
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', [
        'expires' => time() - 3600,
        'path' => '/',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict'
    ]);
}

// Session'ı yok et
session_destroy();

// Ana sayfaya yönlendir
header("Location: ../index.php");
exit;
