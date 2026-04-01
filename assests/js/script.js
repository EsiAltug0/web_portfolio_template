/* ============================================================
   ESMA PORTFOLIO - VANILLA JAVASCRIPT
   Interactivity, scroll effects, animations
   ============================================================ */

// ============================================================
// NAVIGATION
// ============================================================

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
});

// Mobile menu toggle
function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

// Close mobile menu when link is clicked
document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.textContent.includes(section.getAttribute('data-nav'))) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation classes to elements
            const animElements = entry.target.querySelectorAll('[class*="animate-"]');
            animElements.forEach(el => {
                el.style.animation = el.className.match(/animate-\w+/)[0].replace('animate-', '') + ' 0.8s ease forwards';
            });

            // Animate skill bars
            const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease';
                    bar.style.width = width;
                }, 100);
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ============================================================
// HERO SECTION ANIMATIONS
// ============================================================

// Animate hero elements on load
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-left > div, .hero-right');
    heroElements.forEach((el, index) => {
        if (el.style.animationDelay) {
            el.style.opacity = '1';
        }
    });
});

// ============================================================
// SMOOTH SCROLL BEHAVIOR FOR BUTTONS
// ============================================================

document.querySelectorAll('button[onclick*="scrollToSection"]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ============================================================
// PARALLAX EFFECT (Optional - subtle)
// ============================================================

const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        if (scrollPos < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollPos * 0.5}px)`;
        }
    });
}

// ============================================================
// GLITCH TEXT ANIMATION
// ============================================================

const glitchTexts = document.querySelectorAll('.glitch-text');
glitchTexts.forEach(text => {
    const originalText = text.textContent;
    text.setAttribute('data-text', originalText);
});

// ============================================================
// SOCIAL LINK HOVER EFFECTS
// ============================================================

document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.social-icon');
        icon.style.transform = 'scale(1.1)';
    });

    link.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.social-icon');
        icon.style.transform = 'scale(1)';
    });
});

// ============================================================
// HERO MENU ITEMS HOVER
// ============================================================

document.querySelectorAll('.hero-menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const line = this.querySelector('.menu-line');
        const text = this.querySelector('.menu-text');
        line.style.width = '2rem';
        line.style.background = '#00d4ff';
        line.style.boxShadow = '0 0 8px rgba(0, 212, 255, 0.6)';
        text.style.color = '#00d4ff';
        text.style.textShadow = '0 0 10px rgba(0, 212, 255, 0.5)';
    });

    item.addEventListener('mouseleave', function() {
        const line = this.querySelector('.menu-line');
        const text = this.querySelector('.menu-text');
        line.style.width = '1rem';
        line.style.background = 'rgba(232, 244, 248, 0.2)';
        line.style.boxShadow = 'none';
        text.style.color = 'rgba(232, 244, 248, 0.5)';
        text.style.textShadow = 'none';
    });
});

// ============================================================
// PROJECT CARDS HOVER
// ============================================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('img');
        img.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('img');
        img.style.transform = 'scale(1)';
    });
});

// ============================================================
// INFO CARDS HOVER
// ============================================================

document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'rgba(0, 212, 255, 0.4)';
        this.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.1)';
        this.style.transform = 'translateY(-2px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(0, 212, 255, 0.1)';
        this.style.boxShadow = 'none';
        this.style.transform = 'translateY(0)';
    });
});

// ============================================================
// SKILL CARDS HOVER
// ============================================================

document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'rgba(0, 212, 255, 0.4)';
        this.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.1)';
        this.style.transform = 'translateY(-2px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(0, 212, 255, 0.15)';
        this.style.boxShadow = 'none';
        this.style.transform = 'translateY(0)';
    });
});

// ============================================================
// TOOL ICONS HOVER
// ============================================================

document.querySelectorAll('.tool-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ============================================================
// PAGE LOAD ANIMATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Trigger animations for hero section elements
    const heroElements = document.querySelectorAll(
        '.hero-tag, .hero-title, .hero-name, .hero-role, .hero-menu, .hero-right, .scroll-indicator'
    );

    heroElements.forEach((el, index) => {
        const delay = index * 0.1;
        el.style.animation = `fadeInUp 0.8s ease ${delay}s forwards`;
        el.style.opacity = '0';
    });

    // Animate section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.style.animation = 'fadeInUp 0.8s ease forwards';
    });

    document.querySelectorAll('.section-title').forEach(title => {
        title.style.animation = 'fadeInUp 0.8s ease 0.1s forwards';
        title.style.opacity = '0';
    });
});

// ============================================================
// PREVENT DOUBLE CLICKS
// ============================================================

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('disabled')) {
            e.preventDefault();
        }
    });
});

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

// Get viewport height
function getViewportHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight);
}

// Get element position relative to viewport
function getElementViewportPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        isVisible: rect.top < getViewportHeight() && rect.bottom > 0
    };
}

// ============================================================
// PERFORMANCE OPTIMIZATION
// ============================================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================================
// LAZY LOAD IMAGES (Optional)
// ============================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================================
// CONSOLE MESSAGE
// ============================================================

console.log('%cEsma Portfolio 2025', 'color: #00d4ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(0,212,255,0.8);');
console.log('%cDesigned with Cyberpunk Neo-Noir aesthetic', 'color: #ff2d55; font-size: 12px;');
