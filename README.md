# Esma Portfolio 2026 - Final Proje Ödevi

Bu proje, Kırşehir Ahi Evran Üniversitesi Bilgisayar Programcılığı bölümü öğrencisi Esma'nın final proje ödevi kapsamında geliştirilmiş web portföyüdür. Proje, dönem boyunca edinilen bilgileri pekiştirmek ve web geliştirme becerilerini sergilemek amacıyla çeşitli dinamik ve işlevsel özelliklerle zenginleştirilmiştir.

## Özellikler

### 1. Kullanıcı Deneyimi Özellikleri

Proje, kullanıcı etkileşimini artırmak için aşağıdaki özellikleri içermektedir:

*   **Arama Kutusu**: Mağaza sayfasında ürünler arasında kolayca arama yapabilme imkanı sunar.
*   **Kategori Filtreleme**: Mağaza sayfasındaki ürünleri belirli kategorilere göre filtreleyerek kullanıcıların istedikleri ürünlere daha hızlı ulaşmasını sağlar.
*   **İsim veya Fiyata Göre Sıralama**: Mağaza sayfasındaki ürünleri isme (A-Z) veya fiyata (artan/azalan) göre sıralama özelliği eklenmiştir.

### 2. API veya Dinamik Veri Kullanımı

Proje, dinamik veri kullanımını göstermek amacıyla aşağıdaki entegrasyonları barındırır:

*   **JSON Dosyasından Veri Okuma**: Mağaza ve Projeler sayfalarındaki içerikler, JSON dosyalarından dinamik olarak okunarak kart yapısında listelenmektedir. Bu sayede içerik yönetimi kolaylaştırılmıştır.
*   **Harici API Entegrasyonu (Hava Durumu)**: Hakkımda sayfasında Kırşehir'in güncel hava durumu bilgileri, harici bir hava durumu API'sinden (demo verisi ile) çekilerek gösterilmektedir. Gerçek API entegrasyonu için OpenWeatherMap API anahtarı gereklidir.

### 3. Veritabanı İşlemleri

Kullanıcı yönetimi için PHP ve MySQL kullanılarak aşağıdaki veritabanı işlemleri gerçekleştirilmiştir:

*   **Kullanıcı Kayıt Olma**: Kullanıcıların sisteme yeni hesap oluşturabilmesi için kayıt formu ve backend işlevselliği eklenmiştir.
*   **Kullanıcı Giriş Yapma**: Kayıtlı kullanıcıların e-posta ve şifreleriyle sisteme giriş yapabilmesi için giriş formu ve backend işlevselliği sağlanmıştır.

### 4. Projeyi Profesyonelleştirme

Projenin genel kalitesini artırmak için aşağıdaki iyileştirmeler yapılmıştır:

*   **Kırık Linklerin Düzeltilmesi**: Proje içerisindeki tüm navigasyon ve dahili linkler kontrol edilerek kırık linkler giderilmiştir.
*   **Kod Tekrarlarının Azaltılması**: Ortak kullanılan kod blokları (örneğin navigasyon menüsü) daha modüler hale getirilerek kod tekrarı azaltılmıştır.
*   **Sayfa Başlıkları ve Favicon**: Her sayfa için anlamlı başlıklar tanımlanmış ve tarayıcı sekmesinde görüntülenecek özel bir favicon (site simgesi) eklenmiştir.
*   **README.md Dosyası**: Projenin açıklamasını, kullanılan teknolojileri, kurulum ve kullanım talimatlarını içeren bu README.md dosyası oluşturulmuştur.

## Kullanılan Teknolojiler

*   **Frontend**: HTML5, CSS3, JavaScript
*   **Backend**: PHP 8.x
*   **Veritabanı**: MySQL 8.x
*   **Web Sunucusu**: Apache 2

## Kurulum ve Çalıştırma

Projeyi yerel sunucunuzda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Web Sunucusu ve PHP Kurulumu**: Apache ve PHP'yi sisteminize kurun. Ubuntu/Debian tabanlı sistemler için:
    ```bash
    sudo apt update
    sudo apt install -y apache2 php libapache2-mod-php php-mysql
    ```

2.  **MySQL Kurulumu ve Veritabanı Oluşturma**: MySQL sunucusunu kurun ve proje için bir veritabanı ile kullanıcı oluşturun:
    ```bash
    sudo apt install -y mysql-server
    sudo systemctl start mysql
    sudo mysql -e "CREATE DATABASE portfolio_db; CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'password'; GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost'; FLUSH PRIVILEGES;"
    ```
    (Not: 'password' yerine güçlü bir şifre kullanmanız önerilir.)

3.  **Proje Dosyalarını Kopyalama**: İndirdiğiniz proje dosyalarını Apache web sunucusunun kök dizinine (`/var/www/html/`) kopyalayın:
    ```bash
    sudo rm /var/www/html/index.html # Varsayılan Apache sayfasını kaldırın
    sudo mv /path/to/your/web_portfolio_template/* /var/www/html/
    ```
    (Burada `/path/to/your/web_portfolio_template/` yerine projenizin yerel yolunu yazın.)

4.  **Veritabanı Bağlantı Ayarları**: `db_config.php` dosyasının `/var/www/html/` dizininde doğru bir şekilde yapılandırıldığından emin olun. Bu dosya otomatik olarak oluşturulmuştur ve veritabanı bağlantı bilgilerini içerir.

5.  **Tarayıcıda Görüntüleme**: Web tarayıcınızı açın ve `http://localhost/` adresine gidin.

## Kullanım

*   **Kayıt Olma/Giriş Yapma**: `FORM` sayfasına giderek yeni bir kullanıcı hesabı oluşturabilir veya mevcut hesabınızla giriş yapabilirsiniz.
*   **Mağaza Sayfası**: `MAĞAZA` sayfasına giderek ürünleri arayabilir, kategorilere göre filtreleyebilir ve fiyata veya isme göre sıralayabilirsiniz.
*   **Hakkımda Sayfası**: `HAKKIMDA` sayfasında Kırşehir'in güncel hava durumu bilgilerini görebilirsiniz.

## Geliştirme Notları

*   Hava durumu API'si için `weather.php` dosyasında demo API anahtarı kullanılmıştır. Gerçek bir API anahtarı alarak `weather.php` dosyasındaki yorum satırlarını kaldırıp kendi anahtarınızı ekleyerek canlı verilere ulaşabilirsiniz.
*   Veritabanı işlemleri için basit bir `users` tablosu oluşturulmuştur. Daha gelişmiş projeler için veritabanı şeması genişletilebilir.

## Katkıda Bulunma

Projenin geliştirilmesine katkıda bulunmak isterseniz, lütfen bir pull request gönderin veya bir issue açın.

## Lisans

Bu proje açık kaynaklıdır ve MIT Lisansı altında lisanslanmıştır.
