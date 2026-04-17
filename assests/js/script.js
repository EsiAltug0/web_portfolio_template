function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('active');
}

window.addEventListener('load', function() {
    // Skill bar animasyonlarını tetikle
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
});
