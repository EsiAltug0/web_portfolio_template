<?php
// ============================================
// HAKKIMDA SAYFASI
// Kişisel bilgiler, beceriler ve eğitim
// ============================================
$pageTitle = 'Hakkımda';
$basePath = '../';
$navBasePath = '../';

require_once __DIR__ . '/../includes/header.php';
?>

<?php include __DIR__ . '/../includes/navbar.php'; ?>

<main class="pages-container">
    <section id="page-about" class="page active">
        <div class="section-container">
            <div class="section-header">
                <span class="section-number">01</span>
                <div class="section-divider"></div>
            </div>
            <h2 class="section-title">HAKKIMDA</h2>

            <div class="about-grid">
                <div class="profile-card">
                    <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663414524144/sYkejvaCCHzueiFx.jpg" alt="Profil">
                    <div class="profile-overlay"></div>
                    <div class="corner-accent corner-tl"></div>
                    <div class="corner-accent corner-br"></div>
                    <div class="profile-info">
                        <p class="profile-label">MERHABA, BEN</p>
                        <h3 class="profile-name">ESMA</h3>
                    </div>
                </div>

                <div class="about-right">
                    <div class="about-card">
                        <h3 class="about-card-title">KİŞİSEL BİLGİLER</h3>
                        <p>Kırşehir Ahi Evran Üniversitesi Bilgisayar Programcılığı bölümünde öğrenim görüyorum. Tasarım ve teknoloji alanında kendimi geliştirmeye odaklanıyorum.</p>
                        <p>Adobe Photoshop, Adobe Animate ve Canva gibi tasarım araçlarını kullanarak logo, sosyal medya görselleri ve dijital içerikler üretebiliyorum. Görsel tasarımın yanında yazılım alanında da temel bilgiye sahibim ve bu iki alanı birleştirerek yaratıcı projeler üretmeyi hedefliyorum.</p>
                    </div>

                    <div class="about-card">
                        <h3 class="about-card-title">KİŞİLİK ÖZELLİKLERİ</h3>
                        <p>Öğrenmeye açık, detaylara önem veren ve üretmeyi seven biriyim. Amacım hem yazılım hem de dijital tasarım alanında kendimi geliştirerek profesyonel projelerde yer almak.</p>
                        <div class="info-cards">
                            <div class="info-card">
                                <p class="info-label">ŞEHİR</p>
                                <p class="info-value">Kırşehir</p>
                                <p class="info-sub">Türkiye</p>
                            </div>
                            <div class="info-card">
                                <p class="info-label">DURUM</p>
                                <p class="info-value">Aktif</p>
                                <p class="info-sub">Proje Arayışında</p>
                            </div>
                            <div class="info-card">
                                <p class="info-label">DENEYIM</p>
                                <p class="info-value">2+ Yıl</p>
                                <p class="info-sub">Tasarım & Web</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills -->
    <section class="about-section">
        <div class="section-container">
            <div class="section-header">
                <span class="section-number">02</span>
                <div class="section-divider"></div>
            </div>
            <h2 class="section-title">BECERİLER</h2>

            <div class="skills-grid">
                <div class="skill-card">
                    <h3 class="skill-card-title cyan">YAZILIM ARAÇLARI</h3>
                    <div class="tool-icons">
                        <div class="tool-icon" style="--tool-color: #31A8FF;"><span>Ps</span></div>
                        <div class="tool-icon" style="--tool-color: #FF7C00;"><span>An</span></div>
                        <div class="tool-icon" style="--tool-color: #00C4CC;"><span>Cv</span></div>
                    </div>
                    <div class="skill-bars">
                        <div class="skill-bar-item">
                            <div class="skill-bar-header"><span>Photoshop</span><span>80%</span></div>
                            <div class="skill-bar"><div class="skill-bar-fill" style="width: 0%; --bar-color: #31A8FF;" data-width="80"></div></div>
                        </div>
                        <div class="skill-bar-item">
                            <div class="skill-bar-header"><span>Animate</span><span>70%</span></div>
                            <div class="skill-bar"><div class="skill-bar-fill" style="width: 0%; --bar-color: #FF7C00;" data-width="70"></div></div>
                        </div>
                        <div class="skill-bar-item">
                            <div class="skill-bar-header"><span>Canva</span><span>90%</span></div>
                            <div class="skill-bar"><div class="skill-bar-fill" style="width: 0%; --bar-color: #00C4CC;" data-width="90"></div></div>
                        </div>
                    </div>
                </div>

                <div class="skill-card">
                    <h3 class="skill-card-title red">YAZILIM BECERİLERİ</h3>
                    <div class="skill-bars">
                        <div class="skill-bar-item">
                            <div class="skill-bar-header"><span>HTML / CSS</span><span>75%</span></div>
                            <div class="skill-bar"><div class="skill-bar-fill" style="width: 0%;" data-width="75"></div></div>
                        </div>
                        <div class="skill-bar-item">
                            <div class="skill-bar-header"><span>JavaScript</span><span>55%</span></div>
                            <div class="skill-bar"><div class="skill-bar-fill" style="width: 0%;" data-width="55"></div></div>
                        </div>
                        <div class="skill-bar-item">
                            <div class="skill-bar-header"><span>PHP & MySQL</span><span>60%</span></div>
                            <div class="skill-bar"><div class="skill-bar-fill" style="width: 0%; --bar-color: #777BB4;" data-width="60"></div></div>
                        </div>
                        <div class="skill-bar-item">
                            <div class="skill-bar-header"><span>Python Temelleri</span><span>50%</span></div>
                            <div class="skill-bar"><div class="skill-bar-fill" style="width: 0%; --bar-color: #3776AB;" data-width="50"></div></div>
                        </div>
                    </div>
                    <div class="language-section">
                        <h4 class="language-title">DİL (İLETİŞİM)</h4>
                        <div class="skill-bars">
                            <div class="skill-bar-item">
                                <div class="skill-bar-header"><span>TÜRKÇE</span><span>100%</span></div>
                                <div class="skill-bar"><div class="skill-bar-fill" style="width: 0%;" data-width="100"></div></div>
                            </div>
                            <div class="skill-bar-item">
                                <div class="skill-bar-header"><span>İNGİLİZCE</span><span>45%</span></div>
                                <div class="skill-bar"><div class="skill-bar-fill" style="width: 0%;" data-width="45"></div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="skill-card">
                    <div class="education-card">
                        <h3 class="skill-card-title cyan">EĞİTİM</h3>
                        <div class="education-item">
                            <div class="education-line"></div>
                            <div>
                                <p class="education-school">Kırşehir Ahi Evran Üniversitesi</p>
                                <p class="education-program">Bilgisayar Programcılığı</p>
                                <p class="education-status">Devam ediyor</p>
                            </div>
                        </div>
                    </div>
                    <div class="focus-card">
                        <h3 class="skill-card-title red">ODAK ALANLARI</h3>
                        <ul class="focus-list">
                            <li>Logo & Marka Tasarımı</li>
                            <li>Sosyal Medya Görselleri</li>
                            <li>Dijital İçerik Üretimi</li>
                            <li>Animasyon & Motion</li>
                            <li>Web Geliştirme (PHP, MySQL)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<?php 
$footerBasePath = '../';
include __DIR__ . '/../includes/footer.php'; 
?>
