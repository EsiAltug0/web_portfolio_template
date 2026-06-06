<?php
// ============================================
// Veritabanı Bağlantı Yapılandırması
// ============================================
// XAMPP/WAMP kullanıcıları için varsayılan ayarlar:
// - Host: localhost
// - Kullanıcı: root
// - Şifre: (boş)
// - Veritabanı: esma_portfolio
//
// Bu ayarları kendi sunucunuza göre düzenleyin.
// ============================================

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'esma_portfolio');
define('DB_CHARSET', 'utf8mb4');

/**
 * PDO ile veritabanı bağlantısı oluşturur
 * @return PDO
 */
function getDB() {
    static $db = null;
    
    if ($db === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            $db = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            die("Veritabanı bağlantı hatası: " . $e->getMessage());
        }
    }
    
    return $db;
}

/**
 * Basit bir test fonksiyonu - bağlantıyı kontrol eder
 * @return bool
 */
function testDBConnection() {
    try {
        $db = getDB();
        $db->query("SELECT 1");
        return true;
    } catch (Exception $e) {
        return false;
    }
}
