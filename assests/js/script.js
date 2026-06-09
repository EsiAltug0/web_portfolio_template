// ============================================
// MOBILE MENU
// ============================================
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenu) mobileMenu.classList.toggle('active');
    if (mobileMenuBtn) mobileMenuBtn.classList.toggle('active');
}

// ============================================
// KARANLIK / AYDINLIK MOD (THEME TOGGLE)
// ============================================
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;
    const savedTheme = localStorage.getItem('esma-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        document.body.classList.add('light-mode');
        toggleBtn.innerHTML = '🌙';
    } else {
        toggleBtn.innerHTML = '☀️';
    }
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        toggleBtn.style.transform = 'rotate(360deg) scale(0.8)';
        setTimeout(() => {
            toggleBtn.innerHTML = isLight ? '🌙' : '☀️';
            toggleBtn.style.transform = 'rotate(0deg) scale(1)';
        }, 200);
        localStorage.setItem('esma-theme', isLight ? 'light' : 'dark');
    });
}

// ============================================
// TOAST BİLDİRİMİ
// ============================================
function showToast(msg, type = 'success') {
    let toast = document.getElementById('globalToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'globalToast';
        toast.style.cssText = `
            position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
            background: var(--bg-secondary); border: 2px solid var(--primary);
            color: var(--text); padding: 1rem 1.5rem; border-radius: 10px;
            font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem;
            box-shadow: 0 4px 20px rgba(0,255,255,0.3);
            transform: translateY(100px); opacity: 0;
            transition: all 0.3s ease; max-width: 320px;
        `;
        document.body.appendChild(toast);
    }
    if (type === 'error') toast.style.borderColor = '#ff4444';
    else toast.style.borderColor = 'var(--primary)';
    toast.textContent = msg;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
    }, 3000);
}

// ============================================
// KULLANICI OTURUMU YÖNETİMİ
// ============================================
function getUser() {
    return JSON.parse(localStorage.getItem('portfolioUser') || 'null');
}

function setUser(userData) {
    localStorage.setItem('portfolioUser', JSON.stringify(userData));
}

function clearUser() {
    localStorage.removeItem('portfolioUser');
}

function logout() {
    clearUser();
    showToast('Çıkış yapıldı. Görüşürüz! 👋');
    setTimeout(() => { window.location.href = getBasePath() + 'index.html'; }, 1000);
}

function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/')) return '../';
    return '';
}

// ============================================
// SEPET SAYACI
// ============================================
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('shopCart') || '[]');
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => {
        b.textContent = cart.length;
        b.style.display = cart.length > 0 ? 'inline-flex' : 'none';
    });
}

// ============================================
// FAVORİ SAYACI
// ============================================
function updateFavBadge() {
    const favs = JSON.parse(localStorage.getItem('shopFavorites') || '[]');
    const badges = document.querySelectorAll('.fav-badge');
    badges.forEach(b => {
        b.textContent = favs.length;
        b.style.display = favs.length > 0 ? 'inline-flex' : 'none';
    });
}

// ============================================
// NAVBAR KULLANICI ALANI
// ============================================
function initNavAuth() {
    const user = getUser();
    const base = getBasePath();

    // Tüm navbarlardaki auth alanını güncelle
    document.querySelectorAll('#navAuthArea').forEach(area => {
        if (user) {
            area.innerHTML = `
                <span style="color:var(--primary);font-size:0.85rem;margin-right:0.5rem;font-family:'Space Mono',monospace;">
                    👤 ${user.username}
                </span>
                <a href="${base}pages/favorites.html" class="nav-link" style="position:relative;">
                    ♥ <span class="fav-badge" style="
                        position:absolute;top:-6px;right:-8px;
                        background:var(--primary);color:var(--bg);
                        border-radius:50%;width:16px;height:16px;font-size:10px;
                        display:inline-flex;align-items:center;justify-content:center;
                        font-family:'Space Mono',monospace;">0</span>
                </a>
                <a href="${base}pages/cart.html" class="nav-link" style="position:relative;">
                    🛒 <span class="cart-badge" style="
                        position:absolute;top:-6px;right:-8px;
                        background:var(--primary);color:var(--bg);
                        border-radius:50%;width:16px;height:16px;font-size:10px;
                        display:inline-flex;align-items:center;justify-content:center;
                        font-family:'Space Mono',monospace;">0</span>
                </a>
                <button onclick="logout()" class="nav-link" style="
                    background:transparent;border:1px solid #ff4444;
                    color:#ff4444;cursor:pointer;padding:0.3rem 0.8rem;
                    border-radius:4px;font-family:'Space Grotesk',sans-serif;font-size:0.85rem;">
                    ÇIKIŞ
                </button>
            `;
        } else {
            area.innerHTML = `
                <a href="${base}pages/cart.html" class="nav-link" style="position:relative;">
                    🛒 <span class="cart-badge" style="
                        position:absolute;top:-6px;right:-8px;
                        background:var(--primary);color:var(--bg);
                        border-radius:50%;width:16px;height:16px;font-size:10px;
                        display:none;align-items:center;justify-content:center;
                        font-family:'Space Mono',monospace;">0</span>
                </a>
                <a href="${base}pages/form.html" class="nav-link" style="
                    border:1px solid var(--primary);color:var(--primary);
                    padding:0.3rem 0.8rem;border-radius:4px;font-size:0.85rem;">
                    GİRİŞ YAP
                </a>
            `;
        }
        updateCartBadge();
        updateFavBadge();
    });

    // Hero'da hoşgeldin mesajı
    const heroName = document.querySelector('.hero-name');
    if (heroName && user) {
        // Sayfanın ana sayfası mı kontrol et
        const welcomeEl = document.querySelector('.hero-welcome');
        if (!welcomeEl) {
            const welcome = document.createElement('div');
            welcome.className = 'hero-welcome';
            welcome.style.cssText = `
                position: fixed; top: 80px; right: 1.5rem; z-index: 100;
                background: var(--bg-secondary); border: 2px solid var(--primary);
                color: var(--text); padding: 0.6rem 1.2rem; border-radius: 8px;
                font-family: 'Space Mono', monospace; font-size: 0.8rem;
                box-shadow: 0 4px 15px rgba(0,255,255,0.25);
                animation: fadeInDown 0.5s ease;
            `;
            welcome.innerHTML = `Hoş geldin, <span style="color:var(--primary);">${user.username}</span>! ✨`;
            document.body.appendChild(welcome);
            setTimeout(() => { welcome.style.opacity = '0'; welcome.style.transition = 'opacity 1s'; 
                setTimeout(() => welcome.remove(), 1000); }, 4000);
        }
    }
}

// ============================================
// YAZI KARIŞMA EFEKTİ (TEXT SCRAMBLE)
// ============================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.originalText = el.innerText;
    }
    scramble() {
        let iteration = 0;
        const maxIterations = this.originalText.length;
        const interval = setInterval(() => {
            this.el.innerText = this.originalText.split('').map((letter, index) => {
                if (index < iteration) return this.originalText[index];
                return this.chars[Math.floor(Math.random() * this.chars.length)];
            }).join('');
            if (iteration >= maxIterations) {
                clearInterval(interval);
                this.el.innerText = this.originalText;
            }
            iteration += 1/2;
        }, 30);
    }
}

function initTextScramble() {
    const scrambleElements = document.querySelectorAll('.nav-link, .hero-menu-item .menu-text');
    scrambleElements.forEach(el => {
        const fx = new TextScramble(el);
        el.addEventListener('mouseenter', () => fx.scramble());
    });
}

// ============================================
// PROJE DETAY MODALI
// ============================================
const projectData = [
    { id: 0, title: 'Logo Tasarımı', category: 'Grafik Tasarım', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414524144/Pr7irsPhggfGgE57CFPaYr/project-placeholder-3-iro8zEJmh6PBvRbGWo2ttm.webp', description: 'Modern ve minimal çizgilerle hazırlanmış kurumsal kimlik çalışması.', tools: ['Photoshop', 'Illustrator'], colors: ['#00d4ff', '#0a0e27', '#ff0055'] },
    { id: 1, title: 'Sosyal Medya Görseli', category: 'Dijital İçerik', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414524144/Pr7irsPhggfGgE57CFPaYr/project-placeholder-2-TqicT2wSoXiQmStQFzDENe.webp', description: 'Instagram ve LinkedIn için optimize edilmiş görsel tasarım.', tools: ['Canva Pro'], colors: ['#00C4CC', '#ffffff', '#1a1a2e'] },
    { id: 2, title: 'Dijital Tasarım', category: 'Adobe Animate', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414524144/Pr7irsPhggfGgE57CFPaYr/project-placeholder-1-mpDj8wgz6QUG5f7AoZEkYv.webp', description: 'Animasyonlu dijital illüstrasyon ve interaktif web elementleri.', tools: ['Animate', 'Photoshop'], colors: ['#FF7C00', '#31A8FF', '#2d1b69'] },
    { id: 3, title: 'Marka Kimliği', category: 'Branding', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414524144/Pr7irsPhggfGgE57CFPaYr/project-placeholder-3-iro8zEJmh6PBvRbGWo2ttm.webp', description: 'Logo, kartvizit, antetli kağıt ve sosyal medya kiti.', tools: ['Photoshop', 'Canva'], colors: ['#00d4ff', '#0a0e27', '#e0e0e0'] },
    { id: 4, title: 'İçerik Tasarımı', category: 'Sosyal Medya', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414524144/Pr7irsPhggfGgE57CFPaYr/project-placeholder-2-TqicT2wSoXiQmStQFzDENe.webp', description: '30 günlük sosyal medya içerik takvimi tasarımı.', tools: ['Canva'], colors: ['#00C4CC', '#ff0055', '#f0f2f5'] },
    { id: 5, title: 'Animasyon Projesi', category: 'Motion Design', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414524144/Pr7irsPhggfGgE57CFPaYr/project-placeholder-1-mpDj8wgz6QUG5f7AoZEkYv.webp', description: '2D karakter animasyonu ve geçiş efektleri.', tools: ['Adobe Animate'], colors: ['#FF7C00', '#00d4ff', '#0f172a'] }
];

function initProjectModal() {
    const projectCards = document.querySelectorAll('.project-card');
    const modalOverlay = document.getElementById('projectModal');
    if (!modalOverlay) return;
    const modalImage = modalOverlay.querySelector('.modal-image');
    const modalTitle = modalOverlay.querySelector('.modal-title');
    const modalCategory = modalOverlay.querySelector('.modal-category');
    const modalDesc = modalOverlay.querySelector('.modal-description');
    const modalTools = modalOverlay.querySelector('.modal-tools');
    const modalColors = modalOverlay.querySelector('.modal-color-palette');
    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const data = projectData[index];
            if (!data) return;
            modalImage.src = data.image;
            modalTitle.textContent = data.title;
            modalCategory.textContent = data.category;
            modalDesc.textContent = data.description;
            modalTools.innerHTML = data.tools.map(t => `<div class="modal-tool">${t}</div>`).join('');
            modalColors.innerHTML = '<span>Renk Paleti:</span>' + data.colors.map(c => `<div class="color-dot" style="background:${c};color:${c};" title="${c}"></div>`).join('');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    const closeBtn = modalOverlay.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    function closeModal() { modalOverlay.classList.remove('active'); document.body.style.overflow = ''; }
}

// ============================================
// PARALAKS
// ============================================
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    const heroGrid = document.querySelector('.hero-grid');
    const rings = document.querySelector('.rotating-rings');
    const dots = document.querySelectorAll('.floating-dot');
    if (!heroSection) return;
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        if (heroGrid) heroGrid.style.transform = `translate(${x * -30}px, ${y * -30}px) scale(1.05)`;
        if (rings) rings.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(0.9)`;
        dots.forEach((dot, i) => { const speed = (i + 1) * 8; dot.style.transform = `translate(${x * speed}px, ${y * speed}px)`; });
    });
    heroSection.addEventListener('mouseleave', () => {
        if (heroGrid) heroGrid.style.transform = '';
        if (rings) rings.style.transform = '';
        dots.forEach(dot => dot.style.transform = '');
    });
}

// ============================================
// SKILL BAR ANIMATIONS
// ============================================
function animateSkillBars() {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            bar.style.animation = 'none';
            void bar.offsetWidth;
            bar.style.animation = `fillBar 1.5s ease-out forwards`;
            bar.style.setProperty('--final-width', width + '%');
        }
    });
}

// ============================================
// FORM VALIDATION & DATA HANDLING
// ============================================
function validateForm() {
    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const type = document.getElementById('type')?.value || '';
    const subject = document.getElementById('subject')?.value.trim() || '';
    const message = document.getElementById('message')?.value.trim() || '';
    const terms = document.getElementById('terms')?.checked || false;
    let isValid = true;
    if (name.length < 2) { showError('nameError', 'Adınız en az 2 karakter olmalıdır'); isValid = false; }
    if (!isValidEmail(email)) { showError('emailError', 'Lütfen geçerli bir e-posta adresi giriniz'); isValid = false; }
    if (phone && !isValidPhone(phone)) { showError('phoneError', 'Lütfen geçerli bir telefon numarası giriniz'); isValid = false; }
    if (!type) { showError('typeError', 'Lütfen içerik türünü seçiniz'); isValid = false; }
    if (subject.length < 3) { showError('subjectError', 'Konu en az 3 karakter olmalıdır'); isValid = false; }
    if (message.length < 10) { showError('messageError', 'Mesaj en az 10 karakter olmalıdır'); isValid = false; }
    if (!terms) { showError('termsError', 'Lütfen şartları kabul ediniz'); isValid = false; }
    return isValid;
}
function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function isValidPhone(phone) {
    const cleaned = phone.replace(/\s/g, '').replace(/\+90/, '').replace(/^0/, '');
    return /^5\d{9}$/.test(cleaned);
}
function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) { el.textContent = message; el.classList.add('show'); }
}
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => { el.textContent = ''; el.classList.remove('show'); });
}
function clearFieldError(elementId) {
    const el = document.getElementById(elementId);
    if (el) { el.textContent = ''; el.classList.remove('show'); }
}
function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('successMessage');
    if (form && success) { form.style.display = 'none'; success.style.display = 'block'; }
}
function saveFormData(formData) {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    submissions.push({ ...formData, id: Date.now(), date: new Date().toLocaleString('tr-TR') });
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
}
function renderSubmissions() {
    const container = document.getElementById('submissionsList');
    if (!container) return;
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    if (submissions.length === 0) { container.innerHTML = '<p class="no-data">Henüz gönderilen mesaj bulunmamaktadır.</p>'; return; }
    container.innerHTML = submissions.slice().reverse().map(sub => `
        <div class="submission-card">
            <div class="submission-header">
                <span class="submission-name">${escapeHtml(sub.name)}</span>
                <span class="submission-date">${sub.date}</span>
            </div>
            <div class="submission-meta">
                <span class="submission-type">${escapeHtml(sub.type)}</span>
                <span class="submission-subject">${escapeHtml(sub.subject)}</span>
            </div>
            <p class="submission-message">${escapeHtml(sub.message)}</p>
        </div>`).join('');
}
function escapeHtml(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }
function initCharCounter() {
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    if (!messageInput || !charCount) return;
    messageInput.addEventListener('input', function() {
        const current = this.value.length;
        const max = this.getAttribute('maxlength') || 500;
        charCount.textContent = current;
        if (current > max * 0.9) charCount.style.color = 'var(--red)';
        else if (current >= 10) charCount.style.color = 'var(--primary)';
        else charCount.style.color = 'var(--text-light)';
    });
}
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    initCharCounter();
    renderSubmissions();
    const fields = [
        { id: 'name', min: 2, error: 'nameError', msg: 'Adınız en az 2 karakter olmalıdır' },
        { id: 'subject', min: 3, error: 'subjectError', msg: 'Konu en az 3 karakter olmalıdır' },
        { id: 'message', min: 10, error: 'messageError', msg: 'Mesaj en az 10 karakter olmalıdır' }
    ];
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!input) return;
        input.addEventListener('input', function() {
            if (this.value.trim().length > 0 && this.value.trim().length < field.min) showError(field.error, field.msg);
            else clearFieldError(field.error);
        });
        input.addEventListener('blur', function() {
            if (this.value.trim().length < field.min) showError(field.error, field.msg);
            else clearFieldError(field.error);
        });
    });
    const emailInput = document.getElementById('email');
    if (emailInput) { emailInput.addEventListener('input', function() { if (this.value.trim() && !isValidEmail(this.value.trim())) showError('emailError', 'Lütfen geçerli bir e-posta adresi giriniz'); else clearFieldError('emailError'); }); }
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.startsWith('0')) value = value.substring(1);
            if (value.startsWith('90')) value = value.substring(2);
            if (value.length > 0) {
                value = '0' + value;
                if (value.length > 4) value = value.slice(0, 4) + ' ' + value.slice(4);
                if (value.length > 8) value = value.slice(0, 8) + ' ' + value.slice(8);
                if (value.length > 11) value = value.slice(0, 11) + ' ' + value.slice(11);
            }
            this.value = value.trim();
            if (this.value && !isValidPhone(this.value)) showError('phoneError', 'Geçersiz telefon formatı');
            else clearFieldError('phoneError');
        });
    }
    const typeSelect = document.getElementById('type');
    if (typeSelect) typeSelect.addEventListener('change', function() { if (this.value) clearFieldError('typeError'); });
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) termsCheckbox.addEventListener('change', function() { if (this.checked) clearFieldError('termsError'); });
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        if (validateForm()) {
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone')?.value.trim() || '',
                type: document.getElementById('type').value,
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            saveFormData(formData);
            showSuccessMessage();
            renderSubmissions();
            form.reset();
            const charCount = document.getElementById('charCount');
            if (charCount) { charCount.textContent = '0'; charCount.style.color = 'var(--text-light)'; }
        }
    });
}

// ============================================
// NAVBAR ACTIVE STATE
// ============================================
function highlightActiveNav() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const page = href.split('/').pop();
        if (page === current || (current === '' && page === 'index.html')) {
            link.style.color = 'var(--primary)';
            link.style.borderBottom = '2px solid var(--primary)';
        }
    });
}

function initToolIcons() {
    document.querySelectorAll('.tool-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => { icon.style.transform = 'translateY(-5px) scale(1.1)'; });
        icon.addEventListener('mouseleave', () => { icon.style.transform = ''; });
    });
}

function initGlitchText() {
    document.querySelectorAll('.glitch-text').forEach(text => { text.setAttribute('data-text', text.textContent); });
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const mm = document.getElementById('mobileMenu');
        if (mm) mm.classList.remove('active');
    }
});

// ============================================
// MAIN INIT
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initTextScramble();
    initProjectModal();
    initParallax();
    initToolIcons();
    highlightActiveNav();
    initGlitchText();
    animateSkillBars();
    initFormValidation();
    initNavAuth();
    updateCartBadge();
    updateFavBadge();
    console.log('Portfolio 2026 - Interactive Features Loaded! ✓');
});

// ============================================
// JSON VERI OKUMA & SEPET SISTEMI
// ============================================
let allProjects = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';
const projectsContainer = document.getElementById('projectsContainer');
const showAllBtn = document.getElementById('showAll');
const showCartBtn = document.getElementById('showCart');
const detailModal = document.getElementById('detailModal');
const closeBtn = document.querySelector('.json-close-btn');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTechnologies = document.getElementById('modalTechnologies');

async function loadProjects() {
    try {
        const base = getBasePath();
        const response = await fetch(base + 'data/projects.json');
        allProjects = await response.json();
        renderProjects();
    } catch (error) {
        console.error('Veri yüklenirken hata:', error);
        if (projectsContainer) projectsContainer.innerHTML = '<p class="json-empty-message">Veriler yüklenemedi.</p>';
    }
}

function renderProjects() {
    if (!projectsContainer) return;
    projectsContainer.innerHTML = '';
    let projectsToShow = allProjects;
    if (currentFilter === 'cart') projectsToShow = allProjects.filter(p => cart.includes(p.id));
    if (projectsToShow.length === 0) {
        projectsContainer.innerHTML = `<div class="json-empty-message">${currentFilter === 'cart' ? 'Sepetiniz boş. 🛒' : 'Gösterilecek proje bulunamadı.'}</div>`;
        return;
    }
    projectsToShow.forEach(project => { projectsContainer.appendChild(createProjectCard(project)); });
}

function createProjectCard(project) {
    const isInCart = cart.includes(project.id);
    const card = document.createElement('div');
    card.className = 'json-project-card';
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="json-card-content">
            <span class="json-card-category">${project.category}</span>
            <h3 class="json-card-title">${project.title}</h3>
            <p class="json-card-description">${project.description}</p>
            <div class="json-card-technologies">
                ${project.technologies.map(tech => `<span class="json-tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="json-card-actions">
                <button class="json-btn json-btn-cart ${isInCart ? 'active' : ''}" onclick="toggleCart(${project.id})">
                    ${isInCart ? '🛒 Eklendi' : '➕ Sepete Ekle'}
                </button>
                <button class="json-btn json-btn-detail" onclick="showDetail(${project.id})">👁️ Detay</button>
            </div>
        </div>`;
    return card;
}

function toggleCart(projectId) {
    const index = cart.indexOf(projectId);
    if (index === -1) cart.push(projectId);
    else cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderProjects();
}

function showDetail(projectId) {
    const project = allProjects.find(p => p.id === projectId);
    if (!project) return;
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTechnologies.innerHTML = `<h3 style="color:var(--primary);margin-bottom:10px;font-family:'Orbitron',sans-serif;">Kullanılan Teknolojiler:</h3><div class="json-card-technologies">${project.technologies.map(t => `<span class="json-tech-tag">${t}</span>`).join('')}</div>`;
    detailModal.classList.add('active');
}

function closeJsonModal() { if (detailModal) detailModal.classList.remove('active'); }

if (showAllBtn) showAllBtn.addEventListener('click', () => { currentFilter = 'all'; showAllBtn.classList.add('active'); if (showCartBtn) showCartBtn.classList.remove('active'); renderProjects(); });
if (showCartBtn) showCartBtn.addEventListener('click', () => { currentFilter = 'cart'; showCartBtn.classList.add('active'); if (showAllBtn) showAllBtn.classList.remove('active'); renderProjects(); });
if (closeBtn) closeBtn.addEventListener('click', closeJsonModal);
if (detailModal) detailModal.addEventListener('click', (e) => { if (e.target === detailModal) closeJsonModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeJsonModal(); });
if (document.getElementById('projectsContainer')) loadProjects();
