<?php
// ============================================
// Yardımcı Fonksiyonlar
// ============================================

session_start();

/**
 * XSS koruması için güvenli çıktı
 */
function e($str) {
    return htmlspecialchars($str ?? '', ENT_QUOTES, 'UTF-8');
}

/**
 * Kullanıcı giriş yapmış mı kontrol et
 */
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

/**
 * Admin mi kontrol et
 */
function isAdmin() {
    return isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin';
}

/**
 * Giriş yapılmamışsa login sayfasına yönlendir
 */
function requireLogin() {
    if (!isLoggedIn()) {
        header("Location: /WorkSpace/pages/login.php");
        exit;
    }
}

/**
 * Admin değilse ana sayfaya yönlendir
 */
function requireAdmin() {
    if (!isAdmin()) {
        header("Location: /WorkSpace/index.php");
        exit;
    }
}

/**
 * CSRF token oluştur
 */
function generateCSRFToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * CSRF token doğrula
 */
function validateCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Flash mesaj ekle
 */
function setFlashMessage($type, $message) {
    $_SESSION['flash'] = ['type' => $type, 'message' => $message];
}

/**
 * Flash mesaj göster ve temizle
 */
function getFlashMessage() {
    if (isset($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}

/**
 * Flash mesaj HTML'i göster
 */
function showFlashMessage() {
    $flash = getFlashMessage();
    if ($flash) {
        $icon = $flash['type'] === 'success' ? '✓' : ($flash['type'] === 'error' ? '✗' : 'ℹ');
        echo '<div class="flash-message flash-' . $flash['type'] . '">';
        echo '<span class="flash-icon">' . $icon . '</span>';
        echo '<span>' . e($flash['message']) . '</span>';
        echo '</div>';
    }
}

/**
 * Sayfa başlığını güvenli şekilde ayarla
 */
function getPageTitle($title) {
    return e($title) . ' | Esma Portfolio 2026';
}

/**
 * Aktif sayfa linkini belirle
 */
function isActivePage($page) {
    $current = basename($_SERVER['PHP_SELF'], '.php');
    return $current === $page ? 'active' : '';
}

/**
 * Türkçe karakterleri düzgün sıralamak için
 */
function turkishSort($a, $b) {
    $tr = ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü', 'Ç', 'Ğ', 'I', 'İ', 'Ö', 'Ş', 'Ü'];
    $en = ['c', 'g', 'i', 'o', 's', 'u', 'C', 'G', 'I', 'I', 'O', 'S', 'U'];
    
    $aTr = str_replace($tr, $en, $a);
    $bTr = str_replace($tr, $en, $b);
    
    return strcasecmp($aTr, $bTr);
}
