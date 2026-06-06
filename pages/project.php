<?php
// ============================================
// PROJELER SAYFASI
// Arama kutusu, kategori filtreleme, isme göre sıralama
// Mevcut projeler + JSON'dan dinamik projeler
// ============================================
$pageTitle = 'Projeler';
$basePath = '../';
$navBasePath = '../';

require_once __DIR__ . '/../includes/header.php';

// JSON projelerini oku
$jsonProjects = json_decode(file_get_contents(__DIR__ . '/../data/projects.json'), true) ?? [];

// Kategori listesini oluştur
$categories = array_unique(array_column($jsonProjects, 'category'));
sort($categories);

// Arama, filtreleme ve sıralama parametreleri
$search = trim($_GET['search'] ?? '');
$categoryFilter = $_GET['category'] ?? 'all';
$sortBy = $_GET['sort'] ?? 'default';

// Projeleri filtrele
$filteredProjects = $jsonProjects;

// Arama filtresi
if (!empty($search)) {
    $searchLower = mb_strtolower($search);
    $filteredProjects = array_filter($filteredProjects, function($p) use ($searchLower) {
        return mb_strpos(mb_strtolower($p['title']), $searchLower) !== false ||
               mb_strpos(mb_strtolower($p['description']), $searchLower) !== false ||
               mb_strpos(mb_strtolower($p['category']), $searchLower) !== false;
    });
}

// Kategori filtresi
if ($categoryFilter !== 'all') {
    $filteredProjects = array_filter($filteredProjects, function($p) use ($categoryFilter) {
        return $p['category'] === $categoryFilter;
    });
}

// Sıralama
if ($sortBy === 'name_asc') {
    usort($filteredProjects, function($a, $b) {
        return turkishSort($a['title'], $b['title']);
    });
} elseif ($sortBy === 'name_desc') {
    usort($filteredProjects, function($a, $b) {
        return turkishSort($b['title'], $a['title']);
    });
} elseif ($sortBy === 'category') {
    usort($filteredProjects, function($a, $b) {
        return turkishSort($a['category'], $b['category']);
    });
}

// Filtrelenmiş projeleri yeniden indeksle
$filteredProjects = array_values($filteredProjects);
?>

<style>
/* Arama ve Filtreleme Araç Çubuğu */
.filter-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: rgba(0, 212, 255, 0.03);
    border: 1px solid var(--border);
    border-radius: 15px;
    align-items: center;
}
.search-box {
    flex: 1;
    min-width: 250px;
    position: relative;
}
.search-box input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.95rem;
    transition: all 0.3s ease;
}
.search-box input:focus {
    outline: none;
    border-color: var(--primary);
    background: rgba(0, 212, 255, 0.1);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
}
.search-box::before {
    content: '🔍';
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    opacity: 0.6;
}
.filter-select {
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 180px;
}
.filter-select:focus {
    outline: none;
    border-color: var(--primary);
    background: rgba(0, 212, 255, 0.1);
}
.filter-btn-submit {
    background: linear-gradient(135deg, var(--primary), var(--red));
    border: none;
    color: var(--bg);
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Space Grotesk', sans-serif;
}
.filter-btn-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
}
.reset-link {
    color: var(--text-light);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
}
.reset-link:hover {
    color: var(--primary);
}
.results-count {
    color: var(--text-light);
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
}
.results-count strong {
    color: var(--primary);
}

/* Proje Kartları */
.projects-result-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}
.project-result-card {
    background: rgba(0, 212, 255, 0.03);
    border: 1px solid var(--border);
    border-radius: 15px;
    overflow: hidden;
    transition: all 0.3s ease;
}
.project-result-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 212, 255, 0.15);
    border-color: var(--primary);
}
.project-result-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-bottom: 1px solid var(--border);
}
.project-result-content {
    padding: 1.25rem;
}
.project-result-category {
    display: inline-block;
    background: var(--primary);
    color: var(--bg);
    padding: 3px 10px;
    border-radius: 8px;
    font-size: 0.7rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    font-family: 'Orbitron', sans-serif;
}
.project-result-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.5rem;
}
.project-result-desc {
    color: var(--text-light);
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 1rem;
}
.project-result-techs {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}
.tech-tag {
    background: rgba(255, 0, 85, 0.12);
    color: var(--red);
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 600;
    border: 1px solid rgba(255, 0, 85, 0.2);
}
.no-results {
    text-align: center;
    padding: 3rem;
    color: var(--text-light);
    border: 2px dashed var(--border);
    border-radius: 15px;
    grid-column: 1 / -1;
}
</style>

<?php include __DIR__ . '/../includes/navbar.php'; ?>

<main class="pages-container">
    
    <!-- MEVCUT PROJELER SECTION (Korundu) -->
    <section class="page active">
        <div class="section-container">
            <div class="section-header">
                <span class="section-number">03</span>
                <div class="section-divider"></div>
            </div>
            <div class="projects-header">
                <h2 class="section-title">PROJELER</h2>
                <span class="projects-year">2026</span>
            </div>

            <div class="projects-grid">
                <div class="project-card">
                    <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663414524144/Pr7irsPhggfGgE57CFPaYr/project-placeholder-3-iro8zEJmh6PBvRbGWo2ttm.webp" alt="Logo Tasarımı">
                    <div class="project-overlay">
                        <div class="project-info">
                            <div class="project-tools"><span class="tool-badge">Photoshop</span></div>
                            <h4>Logo Tasarımı</h4>
                            <p>Grafik Tasarım</p>
                        </div>
                    </div>
                </div>
                <div class="project-card" style="grid-row: span 2;">
                    <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663414524144/Pr7irsPhggfGgE57CFPaYr/project-placeholder-2-TqicT2wSoXiQmStQFzDENe.webp" alt="Sosyal Medya Görseli">
                    <div class="project-overlay">
                        <div class="project-info">
                            <div class="project-tools"><span class="tool-badge">Canva</span></div>
                            <h4>Sosyal Medya Görseli</h4>
                            <p>Dijital İçerik</p>
                        </div>
                    </div>
                </div>
                <div class="project-card" style="grid-column: span 2;">
                    <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663414524144/Pr7irsPhggfGgE57CFPaYr/project-placeholder-1-mpDj8wgz6QUG5f7AoZEkYv.webp" alt="Dijital Tasarım">
                    <div class="project-overlay">
                        <div class="project-info">
                            <div class="project-tools">
                                <span class="tool-badge">Animate</span>
                                <span class="tool-badge">Photoshop</span>
                            </div>
                            <h4>Dijital Tasarım</h4>
                            <p>Adobe Animate</p>
                        </div>
                    </div>
                </div>
                <div class="project-card">
                    <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663414524144/Pr7irsPhggfGgE57CFPaYr/project-placeholder-3-iro8zEJmh6PBvRbGWo2ttm.webp" alt="Marka Kimliği">
                    <div class="project-overlay">
                        <div class="project-info">
                            <div class="project-tools"><span class="tool-badge">Photoshop</span></div>
                            <h4>Marka Kimliği</h4>
                            <p>Branding</p>
                        </div>
                    </div>
                </div>
                <div class="project-card">
                    <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663414524144/Pr7irsPhggfGgE57CFPaYr/project-placeholder-2-TqicT2wSoXiQmStQFzDENe.webp" alt="İçerik Tasarımı">
                    <div class="project-overlay">
                        <div class="project-info">
                            <div class="project-tools"><span class="tool-badge">Canva</span></div>
                            <h4>İçerik Tasarımı</h4>
                            <p>Sosyal Medya</p>
                        </div>
                    </div>
                </div>
                <div class="project-card">
                    <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663414524144/Pr7irsPhggfGgE57CFPaYr/project-placeholder-1-mpDj8wgz6QUG5f7AoZEkYv.webp" alt="Animasyon Projesi">
                    <div class="project-overlay">
                        <div class="project-info">
                            <div class="project-tools"><span class="tool-badge">Adobe Animate</span></div>
                            <h4>Animasyon Projesi</h4>
                            <p>Motion Design</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- JSON PROJELER - Arama, Filtreleme, Sıralama -->
    <section class="section-container" style="border-top: 1px solid var(--border); padding-top: 4rem;">
        <div class="section-header">
            <span class="section-number">04</span>
            <div class="section-divider"></div>
        </div>
        <h2 class="section-title">DİNAMİK PROJELER</h2>
        
        <p class="results-count">
            JSON verisinden yüklenen projeler. 
            <strong><?php echo count($filteredProjects); ?></strong> proje bulundu
            <?php if (!empty($search)): ?>— "<strong><?php echo e($search); ?></strong>" araması<?php endif; ?>
            <?php if ($categoryFilter !== 'all'): ?>— <strong><?php echo e($categoryFilter); ?></strong> kategorisi<?php endif; ?>
        </p>

        <!-- Arama ve Filtreleme Formu -->
        <form method="GET" action="" class="filter-toolbar">
            <div class="search-box">
                <input type="text" name="search" placeholder="Proje ara..." 
                       value="<?php echo e($search); ?>"
                       onkeydown="if(event.key==='Enter'){this.form.submit();}">
            </div>
            
            <select name="category" class="filter-select">
                <option value="all">Tüm Kategoriler</option>
                <?php foreach ($categories as $cat): ?>
                <option value="<?php echo e($cat); ?>" <?php echo $categoryFilter === $cat ? 'selected' : ''; ?>>
                    <?php echo e($cat); ?>
                </option>
                <?php endforeach; ?>
            </select>
            
            <select name="sort" class="filter-select">
                <option value="default">Varsılan Sıralama</option>
                <option value="name_asc" <?php echo $sortBy === 'name_asc' ? 'selected' : ''; ?>>İsim (A-Z)</option>
                <option value="name_desc" <?php echo $sortBy === 'name_desc' ? 'selected' : ''; ?>>İsim (Z-A)</option>
                <option value="category" <?php echo $sortBy === 'category' ? 'selected' : ''; ?>>Kategoriye Göre</option>
            </select>
            
            <button type="submit" class="filter-btn-submit">Filtrele</button>
            <a href="projects.php" class="reset-link">Sıfırla</a>
        </form>

        <!-- Sonuçlar -->
        <div class="projects-result-grid">
            <?php if (empty($filteredProjects)): ?>
                <div class="no-results">
                    <h3>Proje bulunamadı</h3>
                    <p>Arama kriterlerinize uygun proje bulunmamaktadır. Farklı bir arama terimi deneyin.</p>
                </div>
            <?php else: ?>
                <?php foreach ($filteredProjects as $project): ?>
                <div class="project-result-card">
                    <img src="<?php echo e($project['image']); ?>" alt="<?php echo e($project['title']); ?>" loading="lazy">
                    <div class="project-result-content">
                        <span class="project-result-category"><?php echo e($project['category']); ?></span>
                        <h3 class="project-result-title"><?php echo e($project['title']); ?></h3>
                        <p class="project-result-desc"><?php echo e($project['description']); ?></p>
                        <div class="project-result-techs">
                            <?php foreach ($project['technologies'] as $tech): ?>
                            <span class="tech-tag"><?php echo e($tech); ?></span>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </section>

    <!-- MEVCUT: Proje Detay Modalı (KORUNDU) -->
    <div class="modal-overlay" id="projectModal">
        <div class="modal-container">
            <button class="modal-close">&times;</button>
            <img src="" alt="Proje" class="modal-image">
            <div class="modal-content">
                <h3 class="modal-title"></h3>
                <p class="modal-category"></p>
                <p class="modal-description"></p>
                
                <h4 class="modal-tools-title">Kullanılan Araçlar</h4>
                <div class="modal-tools"></div>
                
                <div class="modal-color-palette"></div>
            </div>
        </div>
    </div>
</main>

<?php 
$footerBasePath = '../';
include __DIR__ . '/../includes/footer.php'; 
?>
