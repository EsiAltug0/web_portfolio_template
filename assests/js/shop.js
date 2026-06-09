// ============================================
// MAĞAZA - ÜRÜN LİSTELEME, ARAMA, FİLTRELEME, SIRALAMA
// ============================================

let allProducts = [];
let favorites = JSON.parse(localStorage.getItem('shopFavorites') || '[]');
let shopCart = JSON.parse(localStorage.getItem('shopCart') || '[]');

// Ürünleri JSON'dan yükle
async function loadProducts() {
    try {
        const response = await fetch('../data/products.json');
        const data = await response.json();
        allProducts = data.products;
        renderProducts(allProducts);
        updateFavCount();
        updateCartBadge();
    } catch (error) {
        console.error('Ürünler yüklenirken hata:', error);
        document.getElementById('productsGrid').innerHTML =
            '<p class="no-data">Ürünler yüklenemedi. Lütfen sayfayı yenileyin.</p>';
    }
}

// Ürünleri render et
function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (products.length === 0) {
        grid.innerHTML = '<p class="no-data">Aramanıza uygun ürün bulunamadı.</p>';
        return;
    }
    grid.innerHTML = products.map(product => {
        const isFav = favorites.includes(product.id);
        const inCart = shopCart.includes(product.id);
        return `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${product.id})">
                        ${isFav ? '❤️' : '🤍'}
                    </button>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-tools">
                        ${product.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
                    </div>
                    <div class="product-footer">
                        <span class="product-price">${product.price.toLocaleString('tr-TR')} ₺</span>
                        <button class="add-to-cart-btn ${inCart ? 'in-cart' : ''}" onclick="addToCart(${product.id})" 
                            style="${inCart ? 'background:var(--bg);color:var(--primary);border:2px solid var(--primary);' : ''}">
                            ${inCart ? '✓ Sepette' : 'Sepete Ekle'}
                        </button>
                    </div>
                </div>
            </div>`;
    }).join('');
}

// Favorilere ekle/çıkar
function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    const product = allProducts.find(p => p.id === productId);
    if (index === -1) {
        favorites.push(productId);
        showToast(`${product.name} favorilere eklendi! ❤️`);
    } else {
        favorites.splice(index, 1);
        showToast(`${product.name} favorilerden çıkarıldı.`);
    }
    localStorage.setItem('shopFavorites', JSON.stringify(favorites));
    updateFavCount();
    updateFavBadge();
    reRenderWithCurrentFilters();
}

function updateFavCount() {
    const countEl = document.getElementById('favCount');
    if (countEl) countEl.textContent = favorites.length;
}

// Sepete ekle
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    shopCart = JSON.parse(localStorage.getItem('shopCart') || '[]');

    if (shopCart.includes(productId)) {
        // Sepete gitmek ister mi?
        if (confirm(`${product.name} zaten sepetinizde. Sepete gitmek ister misiniz?`)) {
            window.location.href = 'cart.html';
        }
        return;
    }

    shopCart.push(productId);
    localStorage.setItem('shopCart', JSON.stringify(shopCart));
    updateCartBadge();
    showToast(`${product.name} sepete eklendi! 🛒`);
    reRenderWithCurrentFilters();
}

function reRenderWithCurrentFilters() {
    const currentCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    let filtered = allProducts;
    if (currentCategory !== 'all') filtered = filtered.filter(p => p.category === currentCategory);
    if (searchTerm) filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
}

// Arama
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
        let filtered = allProducts;
        if (activeCategory !== 'all') filtered = filtered.filter(p => p.category === activeCategory);
        if (term) filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.tools.some(t => t.toLowerCase().includes(term))
        );
        renderProducts(filtered);
    });
}

// Kategori filtreleme
function initCategoryFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
            let filtered = allProducts;
            if (category !== 'all') filtered = filtered.filter(p => p.category === category);
            if (searchTerm) filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm)
            );
            renderProducts(filtered);
        });
    });
}

// Sıralama
function initSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;
    sortSelect.addEventListener('change', (e) => {
        const sortType = e.target.value;
        const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        let filtered = [...allProducts];
        if (activeCategory !== 'all') filtered = filtered.filter(p => p.category === activeCategory);
        if (searchTerm) filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
        if (sortType === 'price-asc') filtered.sort((a, b) => a.price - b.price);
        else if (sortType === 'price-desc') filtered.sort((a, b) => b.price - a.price);
        else if (sortType === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
        renderProducts(filtered);
    });
}

// Başlat
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productsGrid')) {
        loadProducts();
        initSearch();
        initCategoryFilters();
        initSorting();
    }
});
