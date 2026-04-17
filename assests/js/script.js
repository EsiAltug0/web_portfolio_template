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

// FORM VALIDATION & SUBMISSION
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors();
            
            if (validateForm()) {
                showSuccessMessage();
                form.reset();
                setTimeout(() => {
                    form.submit();
                }, 1000);
            }
        });
    }
    
    // Initialize animations
    animateSkillBars();
    highlightActiveNav();
    initGlitchText();
    initObservers();
    initToolIcons();
    initFormValidation();
    initFormFocusEffects();
});

function validateForm() {
    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const type = document.getElementById('type')?.value || '';
    const subject = document.getElementById('subject')?.value.trim() || '';
    const message = document.getElementById('message')?.value.trim() || '';
    const terms = document.getElementById('terms')?.checked || false;
    
    let isValid = true;
    
    if (name.length < 2) {
        showError('nameError', 'Adınız en az 2 karakter olmalıdır');
        isValid = false;
    }
    
    if (!isValidEmail(email)) {
        showError('emailError', 'Lütfen geçerli bir e-posta adresi giriniz');
        isValid = false;
    }
    
    if (!type) {
        showError('typeError', 'Lütfen içerik türünü seçiniz');
        isValid = false;
    }
    
    if (subject.length < 3) {
        showError('subjectError', 'Konu en az 3 karakter olmalıdır');
        isValid = false;
    }
    
    if (message.length < 10) {
        showError('messageError', 'Mesaj en az 10 karakter olmalıdır');
        isValid = false;
    }
    
    if (!terms) {
        showError('termsError', 'Lütfen şartları kabul ediniz');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.classList.remove('show');
    });
}

function clearFieldError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        element.classList.remove('show');
    }
}

function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
    }
}

// NAVBAR STICKY EFFECT
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
});

// INTERSECTION OBSERVER FOR ANIMATIONS
function initObservers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .social-link, .about-card, .info-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// GLITCH TEXT ANIMATION
function initGlitchText() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        const originalText = text.textContent;
        text.setAttribute('data-text', originalText);
    });
}

// ACTIVE PAGE INDICATOR IN NAVBAR
function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const linkPage = href.split('/').pop();
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.style.color = 'var(--primary)';
                link.style.borderBottom = '2px solid var(--primary)';
            }
        }
    });
}

// TOOL ICON HOVER EFFECT
function initToolIcons() {
    const toolIcons = document.querySelectorAll('.tool-icon');
    toolIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// FORM FIELD REAL-TIME VALIDATION
function initFormValidation() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (this.value.trim().length < 2) {
                showError('nameError', 'Adınız en az 2 karakter olmalıdır');
            } else {
                clearFieldError('nameError');
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (!isValidEmail(this.value.trim())) {
                showError('emailError', 'Lütfen geçerli bir e-posta adresi giriniz');
            } else {
                clearFieldError('emailError');
            }
        });
    }
    
    if (subjectInput) {
        subjectInput.addEventListener('blur', function() {
            if (this.value.trim().length < 3) {
                showError('subjectError', 'Konu en az 3 karakter olmalıdır');
            } else {
                clearFieldError('subjectError');
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            if (this.value.trim().length < 10) {
                showError('messageError', 'Mesaj en az 10 karakter olmalıdır');
            } else {
                clearFieldError('messageError');
            }
        });
    }
}

// FORM FIELD FOCUS EFFECT
function initFormFocusEffects() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (this.parentElement) {
                this.parentElement.style.transform = 'scale(1.02)';
            }
        });
        input.addEventListener('blur', function() {
            if (this.parentElement) {
                this.parentElement.style.transform = 'scale(1)';
            }
        });
    });
}

// RESPONSIVE MOBILE MENU
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    }
});

console.log('Portfolio 2026 - Multi Page Loaded! ✓');
