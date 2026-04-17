// MOBILE MENU TOGGLE
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenu) mobileMenu.classList.toggle('active');
    if (mobileMenuBtn) mobileMenuBtn.classList.toggle('active');
}

// SKILL BAR ANIMATIONS
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            bar.style.animation = 'none';
            void bar.offsetWidth;
            bar.style.animation = `fillBar 1.5s ease-out forwards`;
            bar.style.setProperty('--final-width', width + '%');
        }
    });
}

// FORM VALIDATION
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            form.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
        });
    }
});

// NAVBAR STICKY EFFECT
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// INITIALIZE
window.addEventListener('load', function() {
    animateSkillBars();
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        text.setAttribute('data-text', text.textContent);
    });
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) mobileMenu.classList.remove('active');
    }
});
