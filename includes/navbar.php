<?php
// Ortak navigasyon çubuğu - tüm sayfalarda kullanılır
// Aktif sayfa vurgulama ve giriş/kayıt linkleri içerir

$navBasePath = $navBasePath ?? '';
$isLoggedIn = isLoggedIn();
$userName = $_SESSION['user_name'] ?? '';
?>
<nav class="navbar" id="navbar">
    <div class="navbar-container">
        <a href="<?php echo $navBasePath; ?>index.php" class="navbar-logo" style="text-decoration: none;">
            E<span class="logo-dot">.</span>
        </a>

        <!-- Desktop menu -->
        <div class="nav-menu" id="navMenu">
            <a href="<?php echo $navBasePath; ?>index.php" class="nav-link <?php echo isActivePage('index'); ?>">ANA SAYFA</a>
            <a href="<?php echo $navBasePath; ?>pages/about.php" class="nav-link <?php echo isActivePage('about'); ?>">HAKKIMDA</a>
            <a href="<?php echo $navBasePath; ?>pages/projects.php" class="nav-link <?php echo isActivePage('projects'); ?>">PROJELER</a>
            <a href="<?php echo $navBasePath; ?>pages/contact.php" class="nav-link <?php echo isActivePage('contact'); ?>">İLETİŞİM</a>
            <a href="<?php echo $navBasePath; ?>pages/form.php" class="nav-link <?php echo isActivePage('form'); ?>">FORM</a>
            
            <?php if ($isLoggedIn): ?>
                <?php if (isAdmin()): ?>
                <a href="<?php echo $navBasePath; ?>pages/admin/messages.php" class="nav-link <?php echo isActivePage('messages'); ?>">ADMIN</a>
                <?php endif; ?>
            <?php else: ?>
                <a href="<?php echo $navBasePath; ?>pages/login.php" class="nav-link <?php echo isActivePage('login'); ?>">GİRİŞ</a>
            <?php endif; ?>
        </div>

        <!-- User Badge / Year Badge -->
        <?php if ($isLoggedIn): ?>
        <div class="year-badge" style="background: rgba(0, 212, 255, 0.15); border-color: var(--primary);">
            <span class="pulse-dot"></span>
            <span style="font-size: 0.75rem;"><?php echo e($userName); ?></span>
            <a href="<?php echo $navBasePath; ?>pages/logout.php" style="color: var(--red); font-size: 0.7rem; text-decoration: none; margin-left: 0.5rem;">Çıkış</a>
        </div>
        <?php else: ?>
        <div class="year-badge">
            <span class="pulse-dot"></span>
            2026
        </div>
        <?php endif; ?>

        <!-- Theme Toggle -->
        <button class="theme-toggle" id="themeToggle" title="Tema Değiştir">☀️</button>
        
        <!-- Mobile menu button -->
        <button class="mobile-menu-btn" id="mobileMenuBtn" onclick="toggleMobileMenu()">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>

    <!-- Mobile menu -->
    <div class="mobile-menu" id="mobileMenu">
        <a href="<?php echo $navBasePath; ?>index.php" class="nav-link">ANA SAYFA</a>
        <a href="<?php echo $navBasePath; ?>pages/about.php" class="nav-link">HAKKIMDA</a>
        <a href="<?php echo $navBasePath; ?>pages/projects.php" class="nav-link">PROJELER</a>
        <a href="<?php echo $navBasePath; ?>pages/contact.php" class="nav-link">İLETİŞİM</a>
        <a href="<?php echo $navBasePath; ?>pages/form.php" class="nav-link">FORM</a>
        
        <?php if ($isLoggedIn): ?>
            <?php if (isAdmin()): ?>
            <a href="<?php echo $navBasePath; ?>pages/admin/messages.php" class="nav-link">ADMIN</a>
            <?php endif; ?>
            <a href="<?php echo $navBasePath; ?>pages/logout.php" class="nav-link" style="color: var(--red);">ÇIKIŞ YAP</a>
        <?php else: ?>
            <a href="<?php echo $navBasePath; ?>pages/login.php" class="nav-link">GİRİŞ YAP</a>
            <a href="<?php echo $navBasePath; ?>pages/register.php" class="nav-link">KAYIT OL</a>
        <?php endif; ?>
    </div>
</nav>
