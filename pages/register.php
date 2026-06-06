<?php
// ============================================
// KAYIT SAYFASI
// Yeni kullanıcıların hesap oluşturduğu sayfa
// ============================================
$pageTitle = 'Kayıt Ol';
$basePath = '../';
$navBasePath = '../';

require_once __DIR__ . '/../includes/header.php';

// Form gönderildiyse
$errors = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $fullName = trim($_POST['full_name'] ?? '');
    $password = $_POST['password'] ?? '';
    $passwordConfirm = $_POST['password_confirm'] ?? '';
    
    // Validasyon
    if (strlen($username) < 3) {
        $errors[] = 'Kullanıcı adı en az 3 karakter olmalıdır.';
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Geçerli bir e-posta adresi giriniz.';
    }
    if (strlen($password) < 6) {
        $errors[] = 'Şifre en az 6 karakter olmalıdır.';
    }
    if ($password !== $passwordConfirm) {
        $errors[] = 'Şifreler eşleşmiyor.';
    }
    
    if (empty($errors)) {
        try {
            $db = getDB();
            
            // Kullanıcı adı veya email kullanımda mı kontrol et
            $stmt = $db->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
            $stmt->execute([$username, $email]);
            
            if ($stmt->fetch()) {
                $errors[] = 'Bu kullanıcı adı veya e-posta adresi zaten kullanımda.';
            } else {
                // Yeni kullanıcı oluştur
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $db->prepare("INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)");
                $stmt->execute([$username, $email, $hashedPassword, $fullName]);
                
                setFlashMessage('success', 'Kayıt başarılı! Giriş yapabilirsiniz.');
                header("Location: login.php");
                exit;
            }
        } catch (PDOException $e) {
            $errors[] = 'Kayıt işlemi sırasında bir hata oluştu: ' . $e->getMessage();
        }
    }
}
?>

<?php include __DIR__ . '/../includes/navbar.php'; ?>

<main class="pages-container">
    <section class="page active">
        <div class="section-container" style="max-width: 500px;">
            <div class="section-header">
                <span class="section-number">01</span>
                <div class="section-divider"></div>
            </div>
            <h2 class="section-title">KAYIT OL</h2>

            <?php if (!empty($errors)): ?>
                <div class="flash-message flash-error">
                    <span class="flash-icon">✗</span>
                    <span><?php echo e(implode(', ', $errors)); ?></span>
                </div>
            <?php endif; ?>

            <div class="form-container">
                <form method="POST" action="" class="contact-form">
                    <div class="form-group">
                        <label for="username">Kullanıcı Adı *</label>
                        <input type="text" id="username" name="username" required 
                               placeholder="Kullanıcı adınızı girin"
                               value="<?php echo e($_POST['username'] ?? ''); ?>">
                    </div>

                    <div class="form-group">
                        <label for="email">E-Posta Adresi *</label>
                        <input type="email" id="email" name="email" required 
                               placeholder="E-posta adresinizi girin"
                               value="<?php echo e($_POST['email'] ?? ''); ?>">
                    </div>

                    <div class="form-group">
                        <label for="full_name">Ad Soyad</label>
                        <input type="text" id="full_name" name="full_name" 
                               placeholder="Adınız ve soyadınız"
                               value="<?php echo e($_POST['full_name'] ?? ''); ?>">
                    </div>

                    <div class="form-group">
                        <label for="password">Şifre * (en az 6 karakter)</label>
                        <input type="password" id="password" name="password" required 
                               placeholder="Şifrenizi girin">
                    </div>

                    <div class="form-group">
                        <label for="password_confirm">Şifre Tekrar *</label>
                        <input type="password" id="password_confirm" name="password_confirm" required 
                               placeholder="Şifrenizi tekrar girin">
                    </div>

                    <button type="submit" class="submit-btn">KAYIT OL</button>
                    
                    <p class="form-note" style="margin-top: 1.5rem; text-align: center;">
                        Zaten hesabınız var mı? <a href="login.php" style="color: var(--primary);">Giriş yapın</a>
                    </p>
                </form>
            </div>
        </div>
    </section>
</main>

<?php 
$footerBasePath = '../';
include __DIR__ . '/../includes/footer.php'; 
?>
