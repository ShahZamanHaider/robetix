/* ============================================
   ROBETIX — Main JS
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === page) {
            link.classList.add('bg-white/10', 'text-white');
            link.classList.remove('text-slate-300');
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { 
            if(e.isIntersecting) { 
                e.target.classList.add('visible'); 
                observer.unobserve(e.target); 
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    const statsSection = document.querySelector('.counter');
    if (statsSection) {
        const statObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                document.querySelectorAll('.counter').forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const start = performance.now();
                    const update = (time) => {
                        const progress = Math.min((time - start) / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        counter.innerText = Math.floor(easeOut * target);
                        if (progress < 1) requestAnimationFrame(update);
                        else counter.innerText = target;
                    };
                    requestAnimationFrame(update);
                });
                statObserver.disconnect();
            }
        }, { threshold: 0.5 });
        statObserver.observe(statsSection.closest('.fade-up') || statsSection);
    }

    const marqueeContent = document.querySelector('.marquee-content');
    if(marqueeContent) {
        const clone = marqueeContent.cloneNode(true);
        marqueeContent.parentElement.appendChild(clone);
    }
});

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
    document.body.style.overflow = menu.classList.contains('hidden') ? 'auto' : 'hidden';
}

function toggleService(card) {
    const grid = card.closest('.services-grid-wrap');
    const isActive = card.classList.contains('active-service');
    
    grid.querySelectorAll('.blur-card').forEach(c => c.classList.remove('active-service'));
    
    if (isActive) {
        grid.classList.remove('has-active');
    } else {
        card.classList.add('active-service');
        grid.classList.add('has-active');
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
}

function filterProjects(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
        b.classList.add('bg-white', 'text-slate-500', 'border-slate-200');
    });
    btn.classList.remove('bg-white', 'text-slate-500', 'border-slate-200');
    btn.classList.add('bg-blue-600', 'text-white', 'border-blue-600');

    document.querySelectorAll('.project-wrap').forEach(card => {
        if(category === 'all' || card.dataset.cat === category) {
            card.style.display = 'block'; 
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.opacity = '0'; 
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}
