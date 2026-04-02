// PAGE NAVIGATION
function goToPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const selectedPage = document.getElementById(`page-${pageName}`);
    if (selectedPage) {
        selectedPage.classList.add('active');
        window.scrollTo(0, 0);
    }

    // Close mobile menu
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }

    // Trigger animations
    animateSkillBars();
}

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
        if (href !== '#' && !href.includes('page-')) {
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

// INTERSECTION OBSERVER FOR ANIMATIONS
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

// Observe all animated elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .social-link, .about-card, .info-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// INITIAL SKILL BAR ANIMATION
window.addEventListener('load', function() {
    animateSkillBars();
});

// FORM FIELD REAL-TIME VALIDATION
document.addEventListener('DOMContentLoaded', function() {
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
});

function clearFieldError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

// GLITCH TEXT ANIMATION
document.addEventListener('DOMContentLoaded', function() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(text => {
        const originalText = text.textContent;
        text.setAttribute('data-text', originalText);
    });
});

// RESPONSIVE MOBILE MENU
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    }
});

// PREVENT FORM SUBMISSION ON ENTER IN TEXTAREA
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('message');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey) {
                // Allow normal Enter behavior (new line)
            }
        });
    }
});

// ACTIVE PAGE INDICATOR IN NAVBAR
function updateNavbarActiveState(pageName) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
}

// PAGE TRANSITION ANIMATION
function transitionToPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.animation = 'fadeOut 0.3s ease-out forwards';
    });
    
    setTimeout(() => {
        goToPage(pageName);
    }, 300);
}

// TOOL ICON HOVER EFFECT
document.addEventListener('DOMContentLoaded', function() {
    const toolIcons = document.querySelectorAll('.tool-icon');
    
    toolIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// SCROLL TO TOP ON PAGE CHANGE
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// FORM FIELD FOCUS EFFECT
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

console.log('Portfolio 2026 - Loaded Successfully! ✓');
