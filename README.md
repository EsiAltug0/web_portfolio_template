Esma Portföy 2026 — Final Projesi Ödevi
Kırşehir Ahi Evran Üniversitesi Bilgisayar Programcılığı bölümü final olarak verilen kapsamlı kişisel portföy web sitesi.
Kullanılan Teknolojiler
KatmanTeknolojilerBaşlangıç ​​aşamasıHTML5, CSS3, JavaScript (ES6+)Arka uçPHP 8.xVeritabanıMySQL 8.xWeb SunucusuApache 2APIOpenWeatherMap API
Final Ödevi Gereksinimleri
1. Kullanıcı Deneyimi Özellikleri ✅

Arama Kutusu — Mağaza sayfasında ürün arama, Projeler sayfasında proje arama
Kategori Filtreleme — Mağaza'da (Grafik, Sosyal Medya, Web, Animasyon) ve Projeler'de (Web, Mobil, Veri, YZ)
Sıralama — Mağaza sayfasında isim (AZ) ve fiyat (artan/azalan) sıralaması

2. API ve Dinamik Veri Kullanımı ✅

Hava Durumu API — weather.phpile OpenWeatherMap API'den Kırşehir hava durumu (canlı/demo)
JSON Veri — data/products.jsonve data/projects.jsondosyalarından kart yapısı listeleme

3. Veritabanı İşlemleri ✅

Kullanıcı Kayıt — register.php— şifreler hash'li ( )
Kullanıcı Girişi — login.php— PHP oturum dosyası kayıt yönetimi
Mesaj Ekleme — messages.php— iletişim formüllerinin saklanmasına
Mesaj Listeleme — — son 20 mesaj veri tabanından listelenir

4. Profesyonelleştirme ✅

Tüm sayfalarda MAĞAZA linki eklendi, kırık linkler onarıldı
Favicon (SVG) ve tüm sayfalarda anlamlı anlamlar mevcut
Responsive tasarım (mobil uyumlu)
Tema değiştirme (koyu/açık mod)

Veritabanı Tabloları
portfolio/
├── index.html              # Ana sayfa
├── pages/
│   ├── about.html          # Hakkımda + Hava Durumu Widget
│   ├── project.html        # Projeler + JSON Filtreleme
│   ├── shop.html           # Mağaza + Arama/Filtre/Sıralama
│   ├── contact.html        # İletişim
│   └── form.html           # Kayıt/Giriş + Mesaj Formu
├── data/
│   ├── products.json
│   └── projects.json
├── assests/
│   ├── css/style.css
│   └── js/script.js, shop.js
├── db_config.php
├── register.php
├── login.php
├── messages.php
├── weather.php
└── favicon.svg

 Tablolar PHP tarafından otomatik olarak oluşturulur; Manuel SQL çalıştırmaya gerek yoktur.Proje PHP ve MySQL'in sağlanmasından XAMPP dosyası yerel sunucuda çalıştırılmalıdır.

Kurulum
Esma — Kırşehir Ahi Evran Üniversitesi, Bilgisayar Programcılığı 
📍 Kırşehir, Türkiye
