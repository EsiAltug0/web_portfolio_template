// ============================================
// GLOBAL DEĞİŞKENLER
// ============================================
let allProjects = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

// ============================================
// DOM ELEMENTLERİ
// ============================================
const projectsContainer = document.getElementById('projectsContainer');
const showAllBtn = document.getElementById('showAll');
const showCartBtn = document.getElementById('showCart');
const detailModal = document.getElementById('detailModal');
const closeBtn = document.querySelector('.close-btn');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTechnologies = document.getElementById('modalTechnologies');

// ============================================
// JSON'DAN VERİ OKUMA
// ============================================
async function loadProjects() {
    try {
        const response = await fetch('../data/projects.json');
        allProjects = await response.json();
        renderProjects();
    } catch (error) {
        console.error('Veri yüklenirken hata:', error);
        if (projectsContainer) {
            projectsContainer.innerHTML = '<p class="empty-message">Veriler yüklenemedi.</p>';
        }
    }
}

// ============================================
// KARTLARI RENDER ETME
// ============================================
function renderProjects() {
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';
    
    let projectsToShow = allProjects;
    
    if (currentFilter === 'cart') {
        projectsToShow = allProjects.filter(p => cart.includes(p.id));
    }
    
    if (projectsToShow.length === 0) {
        projectsContainer.innerHTML = `
            <div class="empty-message">
                ${currentFilter === 'cart' 
                    ? 'Sepetiniz boş. 🛒' 
                    : 'Gösterilecek proje bulunamadı.'}
            </div>
        `;
        return;
    }
    
    projectsToShow.forEach(project => {
        const card = createProjectCard(project);
        projectsContainer.appendChild(card);
    });
}

// ============================================
// TEK BİR PROJE KARTI OLUŞTURMA
// ============================================
function createProjectCard(project) {
    const isInCart = cart.includes(project.id);
    
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="card-content">
            <span class="card-category">${project.category}</span>
            <h3 class="card-title">${project.title}</h3>
            <p class="card-description">${project.description}</p>
            <div class="card-technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="card-actions">
                <button class="btn btn-cart ${isInCart ? 'active' : ''}" 
                        onclick="toggleCart(${project.id})" 
                        title="${isInCart ? 'Sepetten Çıkar' : 'Sepete Ekle'}">
                    ${isInCart ? '🛒 Eklendi' : '➕ Sepete Ekle'}
                </button>
                <button class="btn btn-detail" onclick="showDetail(${project.id})">
                    👁️ Detay
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// ============================================
// JSON VERI OKUMA & SEPET SISTEMI (4 Mayis Odevi)
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
        const response = await fetch('../data/projects.json');
        allProjects = await response.json();
        renderProjects();
    } catch (error) {
        console.error('Veri yüklenirken hata:', error);
        if (projectsContainer) {
            projectsContainer.innerHTML = '<p class="json-empty-message">Veriler yüklenemedi.</p>';
        }
    }
}

function renderProjects() {
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';
    
    let projectsToShow = allProjects;
    
    if (currentFilter === 'cart') {
        projectsToShow = allProjects.filter(p => cart.includes(p.id));
    }
    
    if (projectsToShow.length === 0) {
        projectsContainer.innerHTML = `
            <div class="json-empty-message">
                ${currentFilter === 'cart' 
                    ? 'Sepetiniz boş. 🛒' 
                    : 'Gösterilecek proje bulunamadı.'}
            </div>
        `;
        return;
    }
    
    projectsToShow.forEach(project => {
        const card = createProjectCard(project);
        projectsContainer.appendChild(card);
    });
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
                <button class="json-btn json-btn-cart ${isInCart ? 'active' : ''}" 
                        onclick="toggleCart(${project.id})" 
                        title="${isInCart ? 'Sepetten Çıkar' : 'Sepete Ekle'}">
                    ${isInCart ? '🛒 Eklendi' : '➕ Sepete Ekle'}
                </button>
                <button class="json-btn json-btn-detail" onclick="showDetail(${project.id})">
                    👁️ Detay
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function toggleCart(projectId) {
    const index = cart.indexOf(projectId);
    
    if (index === -1) {
        cart.push(projectId);
    } else {
        cart.splice(index, 1);
    }
    
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
    
    modalTechnologies.innerHTML = `
        <h3 style="color: var(--primary); margin-bottom: 10px; font-family: 'Orbitron', sans-serif;">Kullanılan Teknolojiler:</h3>
        <div class="json-card-technologies">
            ${project.technologies.map(tech => `<span class="json-tech-tag">${tech}</span>`).join('')}
        </div>
    `;
    
    detailModal.classList.add('active');
}

function closeJsonModal() {
    if (detailModal) detailModal.classList.remove('active');
}

if (showAllBtn) {
    showAllBtn.addEventListener('click', () => {
        currentFilter = 'all';
        showAllBtn.classList.add('active');
        if (showCartBtn) showCartBtn.classList.remove('active');
        renderProjects();
    });
}

if (showCartBtn) {
    showCartBtn.addEventListener('click', () => {
        currentFilter = 'cart';
        showCartBtn.classList.add('active');
        if (showAllBtn) showAllBtn.classList.remove('active');
        renderProjects();
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeJsonModal);
}

if (detailModal) {
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            closeJsonModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeJsonModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('projectsContainer')) {
        loadProjects();
    }
});

// ============================================
// DETAY MODALINI GÖSTERME
// ============================================
function showDetail(projectId) {
    const project = allProjects.find(p => p.id === projectId);
    if (!project) return;
    
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    
    modalTechnologies.innerHTML = `
        <h3 style="color: #00d4ff; margin-bottom: 10px;">Kullanılan Teknolojiler:</h3>
        <div class="card-technologies">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
    `;
    
    detailModal.classList.add('active');
}

// ============================================
// MODAL KAPATMA
// ============================================
function closeModal() {
    if (detailModal) detailModal.classList.remove('active');
}

// ============================================
// FİLTRE BUTONLARI
// ============================================
if (showAllBtn) {
    showAllBtn.addEventListener('click', () => {
        currentFilter = 'all';
        showAllBtn.classList.add('active');
        if (showCartBtn) showCartBtn.classList.remove('active');
        renderProjects();
    });
}

if (showCartBtn) {
    showCartBtn.addEventListener('click', () => {
        currentFilter = 'cart';
        showCartBtn.classList.add('active');
        if (showAllBtn) showAllBtn.classList.remove('active');
        renderProjects();
    });
}

// ============================================
// EVENT LISTENERS
// ============================================
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

if (detailModal) {
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            closeModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ============================================
// BAŞLAT
// ============================================
document.addEventListener('DOMContentLoaded', loadProjects);
