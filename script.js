// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Intersection Observer for fade animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in, .fade-up').forEach(el => fadeObserver.observe(el));

// Counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const startTime = performance.now();

    const easeOut = t => 1 - Math.pow(1 - t, 3);

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(easeOut(progress) * target);
        el.textContent = value.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target.toLocaleString();
    }

    requestAnimationFrame(update);
}

// Hero staggered fade in on load
window.addEventListener('load', () => {
    document.querySelectorAll('#hero .fade-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 160);
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
