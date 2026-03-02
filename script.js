// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
});

(function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        ring.style.width = '60px';
        ring.style.height = '60px';
        ring.style.opacity = '0.8';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.opacity = '0.5';
    });
});

// Counter animation
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();
    const update = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(ease * target);
        if (t < 1) requestAnimationFrame(update);
        else el.textContent = target;
    };
    requestAnimationFrame(update);
}

// Intersection observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Skill bars
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.style.width = bar.getAttribute('data-width') + '%';
            });
            // Counters
            entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-item, .edu-card, .hero-stats, .skills-grid').forEach(el => {
    observer.observe(el);
});

// Also trigger skills section
const skillsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                setTimeout(() => {
                    bar.style.width = bar.getAttribute('data-width') + '%';
                }, 300);
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card').forEach(el => skillsObs.observe(el));

// Hero stats counter trigger
const heroObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.hero-stats').forEach(el => heroObs.observe(el));