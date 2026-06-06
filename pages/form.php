<?php
// ============================================
// İSTEK / ŞİKAYET / MEKTUP FORMU
// Form verilerini MySQL veritabanına kaydeder
// ============================================
$pageTitle = 'İstek Formu';
$basePath = '../';
$navBasePath = '../';

require_once __DIR__ . '/../includes/header.php';

// Form gönderildiyse
$formSuccess = false;
$formError = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $type = $_POST['type'] ?? '';
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');
    $terms = isset($_POST['terms']);
    
    // Validasyon
    $errors = [];
    if (strlen($name) < 2) $errors[] = 'Adınız en az 2 karakter olmalıdır.';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Geçerli bir e-posta adresi giriniz.';
    if (empty($type)) $errors[] = 'İçerik türü seçiniz.';
    if (strlen($subject) < 3) $errors[] = 'Konu en az 3 karakter olmalıdır.';
    if (strlen($message) < 10) $errors[] = 'Mesaj en az 10 karakter olmalıdır.';
    if (!$terms) $errors[] = 'Verilerin işlenmesini kabul etmelisiniz.';
    
    if (empty($errors)) {
        try {
            $db = getDB();
            $stmt = $db->prepare("INSERT INTO messages (name, email, phone, msg_type, subject, message) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $email, $phone, $type, $subject, $message]);
            $formSuccess = true;
        } catch (PDOException $e) {
            $formError = 'Veritabanına kaydederken bir hata oluştu: ' . $e->getMessage();
        }
    } else {
        $formError = implode(' ', $errors);
    }
}
?>

<?php include __DIR__ . '/../includes/navbar.php'; ?>

<main class="pages-container">
    <section id="page-form" class="page active">
        <div class="section-container">
            <div class="section-header">
                <span class="section-number">05</span>
                <div class="section-divider"></div>
            </div>
            <h2 class="section-title">İSTEK / ŞİKAYET / MEKTUP</h2>

            <?php showFlashMessage(); ?>

            <?php if ($formSuccess): ?>
                <div class="success-message" style="margin-bottom: 2rem;">
                    <div class="success-icon">✓</div>
                    <h3>Mesajınız Başarıyla Gönderildi!</h3>
                    <p>Mesajınız veritabanına kaydedildi. En kısa sürede size dönüş yapacağız.</p>
                    <p class="form-note" style="margin-top: 1rem;">Admin panelinden tüm mesajları görüntüleyebilirsiniz.</p>
                    <button onclick="window.location.href='form.php'" class="btn-home" style="margin-top: 1rem;">Yeni Mesaj Gönder</button>
                </div>
            <?php else: ?>

                <?php if ($formError): ?>
                <div class="flash-message flash-error" style="margin-bottom: 1.5rem;">
                    <span class="flash-icon">✗</span>
                    <span><?php echo e($formError); ?></span>
                </div>
                <?php endif; ?>

                <div class="form-container">
                    <form method="POST" action="" class="contact-form" id="contactForm">
                        <div class="form-group">
                            <label for="name">Adınız *</label>
                            <input type="text" id="name" name="name" required placeholder="Adınızı giriniz"
                                   value="<?php echo e($_POST['name'] ?? ''); ?>">
                            <span class="error-message" id="nameError"></span>
                        </div>

                        <div class="form-group">
                            <label for="email">E-Posta Adresiniz *</label>
                            <input type="email" id="email" name="email" required placeholder="E-posta adresinizi giriniz"
                                   value="<?php echo e($_POST['email'] ?? ''); ?>">
                            <span class="error-message" id="emailError"></span>
                        </div>

                        <div class="form-group">
                            <label for="phone">Telefon Numaranız</label>
                            <input type="tel" id="phone" name="phone" placeholder="05xx xxx xx xx" maxlength="14"
                                   value="<?php echo e($_POST['phone'] ?? ''); ?>">
                            <span class="error-message" id="phoneError"></span>
                        </div>

                        <div class="form-group">
                            <label for="type">İçerik Türü *</label>
                            <select id="type" name="type" required>
                                <option value="">Seçiniz</option>
                                <option value="istek" <?php echo ($_POST['type'] ?? '') === 'istek' ? 'selected' : ''; ?>>İstek</option>
                                <option value="sikayet" <?php echo ($_POST['type'] ?? '') === 'sikayet' ? 'selected' : ''; ?>>Şikayet</option>
                                <option value="mektup" <?php echo ($_POST['type'] ?? '') === 'mektup' ? 'selected' : ''; ?>>Mektup</option>
                                <option value="diger" <?php echo ($_POST['type'] ?? '') === 'diger' ? 'selected' : ''; ?>>Diğer</option>
                            </select>
                            <span class="error-message" id="typeError"></span>
                        </div>

                        <div class="form-group">
                            <label for="subject">Konu *</label>
                            <input type="text" id="subject" name="subject" required placeholder="Konuyu giriniz"
                                   value="<?php echo e($_POST['subject'] ?? ''); ?>">
                            <span class="error-message" id="subjectError"></span>
                        </div>

                        <div class="form-group">
                            <label for="message">Mesajınız *</label>
                            <textarea id="message" name="message" required placeholder="Mesajınızı giriniz" rows="8" maxlength="500"><?php echo e($_POST['message'] ?? ''); ?></textarea>
                            <div class="char-counter"><span id="charCount">0</span> / 500 karakter</div>
                            <span class="error-message" id="messageError"></span>
                        </div>

                        <div class="form-group checkbox">
                            <input type="checkbox" id="terms" name="terms" required <?php echo isset($_POST['terms']) ? 'checked' : ''; ?>>
                            <label for="terms">Verilerimin işlenmesine izin veriyorum *</label>
                            <span class="error-message" id="termsError"></span>
                        </div>

                        <button type="submit" class="submit-btn">GÖNDER</button>
                        <p class="form-note">// Form doğrulama aktif — veriler MySQL veritabanına kaydediliyor</p>
                    </form>
                </div>
            <?php endif; ?>

            <!-- Son Gönderilen Mesajlar (Veritabanından) -->
            <div class="submissions-section">
                <div class="section-header">
                    <span class="section-number">06</span>
                    <div class="section-divider"></div>
                </div>
                <h3 class="section-title">SON GÖNDERİLEN MESAJLAR</h3>
                
                <?php
                // Son 5 mesajı veritabanından çek
                try {
                    $db = getDB();
                    $stmt = $db->query("SELECT name, msg_type, subject, message, created_at FROM messages ORDER BY created_at DESC LIMIT 5");
                    $recentMessages = $stmt->fetchAll();
                    
                    if (empty($recentMessages)) {
                        echo '<p class="no-data">Henüz gönderilen mesaj bulunmamaktadır.</p>';
                    } else {
                        foreach ($recentMessages as $sub) {
                            echo '<div class="submission-card">';
                            echo '<div class="submission-header">';
                            echo '<span class="submission-name">' . e($sub['name']) . '</span>';
                            echo '<span class="submission-date">' . e($sub['created_at']) . '</span>';
                            echo '</div>';
                            echo '<div class="submission-meta">';
                            echo '<span class="submission-type">' . e($sub['msg_type']) . '</span>';
                            echo '<span class="submission-subject">' . e($sub['subject']) . '</span>';
                            echo '</div>';
                            echo '<p class="submission-message">' . e($sub['message']) . '</p>';
                            echo '</div>';
                        }
                    }
                } catch (PDOException $e) {
                    echo '<p class="no-data">Veritabanı bağlantısı kurulamadı. Mesajlar görüntülenemiyor.</p>';
                }
                ?>
            </div>
        </div>
    </section>
</main>

<?php 
$footerBasePath = '../';
include __DIR__ . '/../includes/footer.php'; 
?>
