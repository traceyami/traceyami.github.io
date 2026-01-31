// ===== Personal Website Scripts =====

// Hide scroll hint when user starts scrolling
function initScrollHint() {
    const scrollHint = document.querySelector('.scroll-hint');
    if (!scrollHint) return;

    let hasScrolled = false;

    window.addEventListener('scroll', () => {
        if (!hasScrolled && window.scrollY > 50) {
            hasScrolled = true;
            scrollHint.style.opacity = '0';
            scrollHint.style.transition = 'opacity 0.5s ease';
        }
    }, { passive: true });
}

// Add subtle parallax to bird card on mouse move
function initCardInteraction() {
    const card = document.querySelector('.bird-card');
    const container = document.querySelector('.card-image-container');
    if (!card || !container) return;

    // Only enable on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 10;

            card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-5px)`;
        });

        container.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateY(0) rotateX(0) translateY(0)';
        });
    }
}

// Intersection Observer for section animations (re-trigger on scroll into view)
function initScrollAnimations() {
    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const sections = document.querySelectorAll('section:not(.hero)');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initScrollHint();
    initCardInteraction();
    initScrollAnimations();
});
