-- ============================================
-- ESMA PORTFOLIO - MySQL Veritabanı Şeması
-- ============================================

-- Veritabanını oluştur (eğer yoksa)
CREATE DATABASE IF NOT EXISTS esma_portfolio 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE esma_portfolio;

-- ============================================
-- 1. USERS Tablosu (Kullanıcı Kayıt/Giriş)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 2. MESSAGES Tablosu (İletişim Formu)
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    msg_type ENUM('istek', 'sikayet', 'mektup', 'diger') NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. PROJECTS Tablosu (Dinamik Projeler - Opsiyonel)
-- ============================================
CREATE TABLE IF NOT EXISTS db_projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    image VARCHAR(500),
    category VARCHAR(100),
    technologies VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Örnek Admin Kullanıcı (şifre: admin123)
-- NOT: Gerçek projede şifreyi değiştirin!
-- ============================================
-- Admin kullanıcısı register.php üzerinden oluşturulabilir
-- VEYA aşağıdaki INSERT ile direkt eklenebilir:
-- password_hash('admin123', PASSWORD_DEFAULT) ile hash'lenmiş
-- INSERT INTO users (username, email, password, full_name, role) VALUES 
-- ('admin', 'admin@esma.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Esma Admin', 'admin');
