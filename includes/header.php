<?php
// Tüm sayfalarda kullanılan ortak başlık bölümü
// Kod tekrarını önlemek için her sayfanın en üstünde include edilir
require_once __DIR__ . '/functions.php';
require_once __DIR__ . '/db.php';

// Sayfa başlığı varsayılan değeri
$pageTitle = $pageTitle ?? 'Esma Portfolio';
$basePath = $basePath ?? '';
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo getPageTitle($pageTitle); ?></title>
    <meta name="description" content="Esma - Bilgisayar Programcılığı öğrencisi, dijital tasarım ve yazılım geliştirme portfolyosu">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💠</text></svg>">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link rel="stylesheet" href="<?php echo $basePath; ?>assests/css/style.css">
    
    <!-- Flash Message Styles -->
    <style>
        .flash-message {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            margin: 1rem 0;
            font-weight: 600;
            animation: slideInUp 0.5s ease-out;
        }
        .flash-success { background: rgba(0, 212, 255, 0.15); border: 1px solid var(--primary); color: var(--primary); }
        .flash-error { background: rgba(255, 0, 85, 0.15); border: 1px solid var(--red); color: var(--red); }
        .flash-info { background: rgba(255, 193, 7, 0.15); border: 1px solid #ffc107; color: #ffc107; }
        .flash-icon { font-size: 1.2rem; }
    </style>
</head>
<body>
    <!-- Scanline overlay -->
    <div class="scanline-overlay"></div>
