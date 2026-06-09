# Esma Portfolio 2026 — Final Proje Ödevi

Kırşehir Ahi Evran Üniversitesi Bilgisayar Programcılığı bölümü final ödevi kapsamında geliştirilen kişisel portfolio web sitesi.

## Kullanılan Teknolojiler

| Katman | Teknolojiler |
|--------|-------------|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Backend | PHP 8.x |
| Veritabanı | MySQL 8.x |
| Web Sunucusu | Apache 2 |
| API | OpenWeatherMap API |

## Final Ödevi Gereksinimleri

### 1. Kullanıcı Deneyimi Özellikleri ✅

- **Arama Kutusu** — Mağaza sayfasında ürün arama, Projeler sayfasında proje arama
- **Kategori Filtreleme** — Mağaza'da (Grafik, Sosyal Medya, Web, Animasyon) ve Projeler'de (Web, Mobil, Veri, YZ)
- **İsim / Fiyata Göre Sıralama** — Mağaza sayfasında isim (A-Z) ve fiyat (artan/azalan) sıralama

### 2. API ve Dinamik Veri Kullanımı ✅

- **Harici API** — `weather.php` ile OpenWeatherMap API'den Kırşehir hava durumu (canlı/demo)
- **JSON Veri Okuma** — `data/products.json` ve `data/projects.json` dosyalarından kart yapısında listeleme

### 3. Veritabanı İşlemleri ✅

- **Kullanıcı Kayıt** — `register.php` — şifreler hash'li (`password_hash`) kaydedilir
- **Kullanıcı Giriş** — `login.php` — PHP session ile oturum yönetimi
- **Mesaj Ekleme** — `messages.php POST` — iletişim formu veritabanına kaydedilir
- **Mesaj Listeleme** — `messages.php GET` — son 20 mesaj veritabanından listelenir

### 4. Profesyonelleştirme ✅

- Tüm sayfalarda MAĞAZA linki eklendi, kırık linkler düzeltildi
- Favicon (SVG) ve tüm sayfalarda anlamlı `<title>` etiketleri mevcut
- Responsive tasarım (mobil uyumlu)
- Tema değiştirme (koyu/açık mod)

## Veritabanı Tabloları

```sql
-- Kullanıcılar
CREATE TABLE users (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(50)  NOT NULL UNIQUE,
    email      VARCHAR(100) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,           -- password_hash()
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mesajlar
CREATE TABLE messages (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL,
    phone      VARCHAR(20),
    type       VARCHAR(30)  NOT NULL,
    subject    VARCHAR(200) NOT NULL,
    message    TEXT         NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> **Not:** Tablolar PHP tarafından otomatik oluşturulur; manuel SQL çalıştırmaya gerek yoktur.

## Kurulum

### Gereksinimler
- PHP 8.x + Apache veya XAMPP/WAMP/LAMP
- MySQL 8.x

### Adımlar

1. **Projeyi sunucu klasörüne kopyala**
   ```bash
   # XAMPP kullanıcıları için:
   cp -r web_portfolio_template/ C:/xampp/htdocs/portfolio/
   # LAMP (Linux) için:
   cp -r web_portfolio_template/ /var/www/html/portfolio/
   ```

2. **MySQL'de veritabanı oluştur**
   ```sql
   CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'esma'@'localhost' IDENTIFIED BY '123321';
   GRANT ALL PRIVILEGES ON portfolio_db.* TO 'esma'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **`db_config.php` ayarlarını kontrol et**
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'esma');
   define('DB_PASS', '123321');
   define('DB_NAME', 'portfolio_db');
   ```

4. **OpenWeatherMap API (isteğe bağlı)**
   - https://openweathermap.org/api adresinden ücretsiz API anahtarı al
   - `weather.php` dosyasındaki `YOUR_OPENWEATHERMAP_API_KEY` yerine yaz
   - API anahtarı yoksa otomatik demo veri gösterilir

5. **Tarayıcıda aç**
   ```
   http://localhost/portfolio/
   ```

## Proje Yapısı

```
portfolio/
├── index.html              # Ana sayfa
├── pages/
│   ├── about.html          # Hakkımda + Hava Durumu Widget
│   ├── project.html        # Projeler + JSON Filtreleme
│   ├── shop.html           # Mağaza + Arama/Filtre/Sıralama
│   ├── contact.html        # İletişim
│   └── form.html           # Kayıt/Giriş + Mesaj Formu
├── assests/
│   ├── css/style.css
│   └── js/
│       ├── script.js
│       └── shop.js
├── data/
│   ├── products.json       # Mağaza ürünleri
│   └── projects.json       # JSON projeler
├── db_config.php           # Veritabanı bağlantısı
├── register.php            # Kullanıcı kayıt
├── login.php               # Kullanıcı giriş (session)
├── messages.php            # Mesaj ekle/listele
├── weather.php             # Hava durumu API
├── favicon.svg
└── README.md
```

## Geliştirici

**Esma** — Kırşehir Ahi Evran Üniversitesi, Bilgisayar Programcılığı  
📍 Kırşehir, Türkiye

## Lisans

MIT License
