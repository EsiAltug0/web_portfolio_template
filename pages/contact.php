<?php
// ============================================
// İLETİŞİM SAYFASI
// Sosyal medya linkleri ve iletişim bilgileri
// Kırık linkler düzeltildi
// ============================================
$pageTitle = 'İletişim';
$basePath = '../';
$navBasePath = '../';

require_once __DIR__ . '/../includes/header.php';

// İletişim formu gönderildiyse
$formSuccess = false;
$formError = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['contact_name'] ?? '');
    $email = trim($_POST['contact_email'] ?? '');
    $subject = trim($_POST['contact_subject'] ?? '');
    $message = trim($_POST['contact_message'] ?? '');
    
    $errors = [];
    if (strlen($name) < 2) $errors[] = 'Adınız en az 2 karakter olmalıdır.';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Geçerli bir e-posta adresi giriniz.';
    if (strlen($subject) < 3) $errors[] = 'Konu en az 3 karakter olmalıdır.';
    if (strlen($message) < 10) $errors[] = 'Mesaj en az 10 karakter olmalıdır.';
    
    if (empty($errors)) {
        try {
            $db = getDB();
            $stmt = $db->prepare("INSERT INTO messages (name, email, msg_type, subject, message) VALUES (?, ?, 'diger', ?, ?)");
            $stmt->execute([$name, $email, $subject, $message]);
            $formSuccess = true;
        } catch (PDOException $e) {
            $formError = 'Veritabanına kaydederken bir hata oluştu.';
        }
    } else {
        $formError = implode(' ', $errors);
    }
}
?>

<style>
.contact-form-section {
    margin-top: 3rem;
    padding-top: 3rem;
    border-top: 1px solid var(--border);
}
.social-links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}
</style>

<?php include __DIR__ . '/../includes/navbar.php'; ?>

<main class="pages-container">
    <section id="page-contact" class="page active">
        <div class="section-container">
            <div class="section-header">
                <span class="section-number">04</span>
                <div class="section-divider"></div>
            </div>
            <h2 class="section-title">İLETİŞİM</h2>

            <?php showFlashMessage(); ?>

            <?php if ($formSuccess): ?>
                <div class="success-message" style="margin-bottom: 2rem;">
                    <div class="success-icon">✓</div>
                    <h3>Mesajınız Gönderildi!</h3>
                    <p>Mesajınız başarıyla veritabanına kaydedildi.</p>
                    <button onclick="window.location.href='contact.php'" class="btn-home" style="margin-top: 1rem;">Yeni Mesaj Gönder</button>
                </div>
            <?php endif; ?>

            <?php if ($formError && !$formSuccess): ?>
            <div class="flash-message flash-error" style="margin-bottom: 1.5rem;">
                <span class="flash-icon">✗</span>
                <span><?php echo e($formError); ?></span>
            </div>
            <?php endif; ?>

            <div class="contact-grid">
                <div class="contact-left">
                    <h3 class="contact-subtitle">BANA ULAŞIN</h3>
                    
                    <div class="social-links-grid">
                        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" class="social-link">
                            <div class="social-icon" style="--social-color: #E1306C;">IG</div>
                            <div class="social-info">
                                <p class="social-platform">Instagram</p>
                                <p class="social-handle">@esma.design</p>
                            </div>
                            <span class="social-arrow">→</span>
                        </a>

                        <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" class="social-link">
                            <div class="social-icon" style="--social-color: #0077B5;">Li</div>
                            <div class="social-info">
                                <p class="social-platform">LinkedIn</p>
                                <p class="social-handle">Esma Altug</p>
                            </div>
                            <span class="social-arrow">→</span>
                        </a>

                        <a href="https://github.com/EsiAltug0" target="_blank" rel="noopener noreferrer" class="social-link">
                            <div class="social-icon" style="--social-color: #333;">GH</div>
                            <div class="social-info">
                                <p class="social-platform">GitHub</p>
                                <p class="social-handle">@EsiAltug0</p>
                            </div>
                            <span class="social-arrow">→</span>
                        </a>

                        <a href="mailto:esma.altug@email.com" class="social-link">
                            <div class="social-icon" style="--social-color: #00d4ff;">@</div>
                            <div class="social-info">
                                <p class="social-platform">E-Posta</p>
                                <p class="social-handle">esma.altug@email.com</p>
                            </div>
                            <span class="social-arrow">→</span>
                        </a>
                    </div>
                </div>

                <div class="contact-right">
                    <p class="thank-you-label">// teşekkürler</p>
                    <h2 class="thank-you-text">TEŞEKKÜR</h2>
                    <h2 class="thank-you-year">2026</h2>
                    <p class="thank-you-message">Portfolyomu ziyaret ettiğiniz için teşekkür ederim. Projelerim hakkında daha fazla bilgi almak veya işbirliği tekliflerinizi iletmek için yukarıdaki kanallardan bana ulaşabilirsiniz.</p>
                    <div class="thank-you-line"></div>
                </div>
            </div>

            <!-- Hızlı İletişim Formu -->
            <div class="contact-form-section">
                <div class="section-header">
                    <span class="section-number">05</span>
                    <div class="section-divider"></div>
                </div>
                <h3 class="section-title" style="font-size: 1.5rem;">HIZLI MESAJ GÖNDER</h3>
                
                <div class="form-container" style="max-width: 600px;">
                    <form method="POST" action="" class="contact-form">
                        <div class="form-group">
                            <label for="contact_name">Adınız *</label>
                            <input type="text" id="contact_name" name="contact_name" required 
                                   placeholder="Adınızı giriniz"
                                   value="<?php echo e($_POST['contact_name'] ?? ''); ?>">
                        </div>
                        <div class="form-group">
                            <label for="contact_email">E-Posta *</label>
                            <input type="email" id="contact_email" name="contact_email" required 
                                   placeholder="E-posta adresinizi giriniz"
                                   value="<?php echo e($_POST['contact_email'] ?? ''); ?>">
                        </div>
                        <div class="form-group">
                            <label for="contact_subject">Konu *</label>
                            <input type="text" id="contact_subject" name="contact_subject" required 
                                   placeholder="Konuyu giriniz"
                                   value="<?php echo e($_POST['contact_subject'] ?? ''); ?>">
                        </div>
                        <div class="form-group">
                            <label for="contact_message">Mesajınız *</label>
                            <textarea id="contact_message" name="contact_message" required placeholder="Mesajınızı giriniz" rows="5"><?php echo e($_POST['contact_message'] ?? ''); ?></textarea>
                        </div>
                        <button type="submit" class="submit-btn">GÖNDER</button>
                        <p class="form-note">// Veriler MySQL veritabanına kaydedilmektedir</p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</main>

<?php 
$footerBasePath = '../';
include __DIR__ . '/../includes/footer.php'; 
?>
