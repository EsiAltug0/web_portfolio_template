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

// SKILL BAR ANIMATIONS
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            // Reset animation
            bar.style.animation = 'none';
            
            // Trigger reflow to restart animation
            void bar.offsetWidth;
            
            // Apply animation
            bar.style.animation = `fillBar 1.5s ease-out forwards`;
            bar.style.setProperty('--final-width', width + '%');
        }
    });
}

// FORM VALIDATION & SUBMISSION
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Validate form
            if (validateForm()) {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                form.reset();
                
                // Submit to Formspree after 1 second
                setTimeout(() => {
                    form.submit();
                }, 1000);
            }
        });
    }
});

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const type = document.getElementById('type').value;
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const terms = document.getElementById('terms').checked;
    
    let isValid = true;
    
    // Name validation
    if (name.length < 2) {
        showError('nameError', 'Adınız en az 2 karakter olmalıdır');
        isValid = false;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showError('emailError', 'Lütfen geçerli bir e-posta adresi giriniz');
        isValid = false;
    }
    
    // Type validation
    if (!type) {
        showError('typeError', 'Lütfen içerik türünü seçiniz');
        isValid = false;
    }
    
    // Subject validation
    if (subject.length < 3) {
        showError('subjectError', 'Konu en az 3 karakter olmalıdır');
        isValid = false;
    }
    
    // Message validation
    if (message.length < 10) {
        showError('messageError', 'Mesaj en az 10 karakter olmalıdır');
        isValid = false;
    }
    
    // Terms validation
    if (!terms) {
        showError('termsError', 'Lütfen şartları kabul ediniz');
        isValid = false;
    }
    
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
