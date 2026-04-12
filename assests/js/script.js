// MOBILE MENU TOGGLE
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
    
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.toggle('active');
    }
}

// RESPONSIVE DESIGN - WINDOW RESIZE HANDLER
function handleResponsiveDesign() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    // Close mobile menu on larger screens
    if (window.innerWidth > 768) {
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    }
}

// Listen for window resize events
window.addEventListener('resize', handleResponsiveDesign);

// Initial responsive check
handleResponsiveDesign();

// NAVBAR STICKY EFFECT
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// GLITCH TEXT ANIMATION
document.addEventListener('DOMContentLoaded', function() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(text => {
        const originalText = text.textContent;
        text.setAttribute('data-text', originalText);
    });
});

console.log('Portfolio 2026 - Responsive Version Loaded Successfully! ✓');
