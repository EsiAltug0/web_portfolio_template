<?php
// ============================================
// GİRİŞ SAYFASI
// Kullanıcıların mevcut hesaplarıyla giriş yaptığı sayfa
// ============================================
$pageTitle = 'Giriş Yap';
$basePath = '../';
$navBasePath = '../';

require_once __DIR__ . '/../includes/header.php';

// Form gönderildiyse
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (empty($username) || empty($password)) {
        $error = 'Kullanıcı adı ve şifre alanları zorunludur.';
    } else {
        try {
            $db = getDB();
            $stmt = $db->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
            $stmt->execute([$username, $username]);
            $user = $stmt->fetch();
            
            if ($user && password_verify($password, $user['password'])) {
                // Giriş başarılı
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['username'];
                $_SESSION['user_role'] = $user['role'];
                
                setFlashMessage('success', 'Hoş geldiniz, ' . $user['username'] . '!');
                
                // Admin ise admin paneline, değilse ana sayfaya yönlendir
                if ($user['role'] === 'admin') {
                    header("Location: admin/messages.php");
                } else {
                    header("Location: ../index.php");
                }
                exit;
            } else {
                $error = 'Kullanıcı adı veya şifre hatalı.';
            }
        } catch (PDOException $e) {
            $error = 'Bir hata oluştu. Lütfen tekrar deneyin.';
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
            <h2 class="section-title">GİRİŞ YAP</h2>

            <?php showFlashMessage(); ?>

            <?php if ($error): ?>
                <div class="flash-message flash-error">
                    <span class="flash-icon">✗</span>
                    <span><?php echo e($error); ?></span>
                </div>
            <?php endif; ?>

            <div class="form-container">
                <form method="POST" action="" class="contact-form">
                    <div class="form-group">
                        <label for="username">Kullanıcı Adı veya E-Posta *</label>
                        <input type="text" id="username" name="username" required 
                               placeholder="Kullanıcı adınızı veya e-posta adresinizi girin"
                               value="<?php echo e($_POST['username'] ?? ''); ?>">
                    </div>

                    <div class="form-group">
                        <label for="password">Şifre *</label>
                        <input type="password" id="password" name="password" required 
                               placeholder="Şifrenizi girin">
                    </div>

                    <button type="submit" class="submit-btn">GİRİŞ YAP</button>
                    
                    <p class="form-note" style="margin-top: 1.5rem; text-align: center;">
                        Hesabınız yok mu? <a href="register.php" style="color: var(--primary);">Kayıt olun</a>
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
