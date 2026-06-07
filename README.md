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
