<?php
// Ortak footer - tüm sayfalarda kullanılır
$footerBasePath = $footerBasePath ?? '';
?>
    <!-- Footer -->
    <footer class="footer">
        <a href="<?php echo $footerBasePath; ?>index.php" class="footer-logo" style="text-decoration: none;">E<span class="logo-dot">.</span></a>
        <p class="footer-text">&copy; 2026 Esma — Tüm hakları saklıdır</p>
        <div class="footer-location">
            <span class="location-dot"></span>
            <span>Kırşehir, TR</span>
        </div>
    </footer>

    <script src="<?php echo $footerBasePath; ?>assests/js/script.js"></script>
</body>
</html>
