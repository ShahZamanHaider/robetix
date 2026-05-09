/* ============================================
   ROBETIX — Main JS
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {

    /* ---- Active nav link ---- */
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === page) {
            link.classList.add('bg-white/10', 'text-white');
            link.classList.remove('text-slate-300');
        }
    });

    /* ---- Scroll reveal ---- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    /* ---- Scroll-triggered counters ---- */
    const counters = document.querySelectorAll('.counter');
    if (counters.length) {
        let fired = false;
        const statObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !fired) {
                fired = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 1800;
                    const start = performance.now();
                    const update = (time) => {
                        const progress = Math.min((time - start) / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 4);
                        counter.textContent = Math.floor(easeOut * target);
                        if (progress < 1) requestAnimationFrame(update);
                        else counter.textContent = target;
                    };
                    requestAnimationFrame(update);
                });
                statObserver.disconnect();
            }
        }, { threshold: 0.3 });

        const statSection = document.getElementById('stats-section');
        if (statSection) statObserver.observe(statSection);
    }

    /* ---- Marquee duplication ---- */
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        const clone = marqueeContent.cloneNode(true);
        marqueeContent.parentElement.appendChild(clone);
    }
});

/* ---- Mobile menu ---- */
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
    document.body.style.overflow = menu.classList.contains('hidden') ? 'auto' : 'hidden';
}

/* ---- Services toggle ---- */
function toggleService(card) {
    const grid = card.closest('.services-grid-wrap');
    const isActive = card.classList.contains('active-service');
    grid.querySelectorAll('.blur-card').forEach(c => c.classList.remove('active-service'));
    if (isActive) {
        grid.classList.remove('has-active');
    } else {
        card.classList.add('active-service');
        grid.classList.add('has-active');
        setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 300);
    }
}

/* ---- Project filter ---- */
function filterProjects(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
        b.classList.add('bg-white', 'text-slate-500', 'border-slate-200');
    });
    btn.classList.remove('bg-white', 'text-slate-500', 'border-slate-200');
    btn.classList.add('bg-blue-600', 'text-white', 'border-blue-600');
    document.querySelectorAll('.project-wrap').forEach(card => {
        if (category === 'all' || card.dataset.cat === category) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}

/* ---- Blog search ---- */
function searchBlogs() {
    const q = document.getElementById('blogSearch').value.toLowerCase();
    let visible = 0;
    document.querySelectorAll('#blogGrid .blog-card').forEach(card => {
        const title = card.querySelector('.blog-title')?.textContent?.toLowerCase() || '';
        const show = !q || title.includes(q);
        card.style.display = show ? '' : 'none';
        if (show) visible++;
    });
    const noRes = document.getElementById('noResults');
    if (noRes) noRes.classList.toggle('hidden', visible > 0);
}
