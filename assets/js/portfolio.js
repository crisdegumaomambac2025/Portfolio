// Set current year in footer
// Moving background cells animation
// Right-click warning modal logic
// Disable right-click (context menu)
// Block F12, Ctrl+Shift+I/J/C/U, Ctrl+U, etc.
// Dark mode toggle logic
// Floating scroll-to-top button logic
// Smooth scroll for navbar links
// Hamburger menu toggle logic

// Set current year in footer
const footerYear = document.getElementById('footer-year');
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

// Moving background cells animation
const canvas = document.getElementById('bg-cells');
const ctx = canvas.getContext('2d');
let width, height;
function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const CELL_COUNT = 28;
const cells = [];
for (let i = 0; i < CELL_COUNT; i++) {
    cells.push({
        opacity: 0.08 + Math.random() * 0.12
    });
}
let mouse = { x: null, y: null };
canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});
canvas.addEventListener('mouseleave', function() {
    mouse.x = null;
    mouse.y = null;
});
const REPEL_RADIUS = 60;
const REPEL_FORCE = 1.8;
document.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouse.y = e.clientY - rect.top;
    } else {
        mouse.y = null;
    }
    if (e.clientX >= rect.left && e.clientX <= rect.right) {
        mouse.x = e.clientX - rect.left;
    } else {
        mouse.x = null;
    }
});
document.addEventListener('mouseleave', function() {
    mouse.x = null;
    mouse.y = null;
});
function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const cell of cells) {
        // ...cell animation logic...
    }
    requestAnimationFrame(animate);
}
animate();

// Right-click warning modal logic
let rightClickCount = 0;
const modal = document.getElementById('rightclick-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
document.addEventListener('contextmenu', function(e) {
    rightClickCount++;
    if (rightClickCount > 3) {
        if (modal) modal.style.display = 'flex';
    }
});
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.style.display = 'none';
    });
}
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key.toLowerCase() === 'u') {
        e.preventDefault();
    }
});

// Dark mode toggle logic
const darkmodeBtn = document.getElementById('darkmode-toggle');
const darkmodeLabel = document.getElementById('darkmode-label');
const darkmodeIcon = darkmodeBtn ? darkmodeBtn.querySelector('i') : null;
const navbarBarsIcon = document.getElementById('navbar-bars-icon');
const navbarLinks = document.getElementById('navbar-links');
const navbarLinkEls = document.querySelectorAll('.navbar-link');
function setNavbarColors(isDark) {
    if (navbarBarsIcon) {
        navbarBarsIcon.style.color = isDark ? '#232323' : '#f5f5f5';
    }
    navbarLinkEls.forEach(function(link) {
        link.style.color = isDark ? '#232323' : '#f5f5f5';
    });
    if (navbarLinks) {
        navbarLinks.style.background = isDark ? 'rgba(245,245,245,0.95)' : 'rgba(35,35,35,0.95)';
    }
}
function setDarkMode(on) {
    if (on) {
        document.body.classList.add('darkmode');
        setNavbarColors(true);
        if (darkmodeIcon) {
            darkmodeIcon.classList.remove('fa-sun');
            darkmodeIcon.classList.add('fa-moon');
        }
        if (darkmodeLabel) darkmodeLabel.textContent = 'Dark Mode';
    } else {
        document.body.classList.remove('darkmode');
        setNavbarColors(false);
        if (darkmodeIcon) {
            darkmodeIcon.classList.remove('fa-moon');
            darkmodeIcon.classList.add('fa-sun');
        }
        if (darkmodeLabel) darkmodeLabel.textContent = 'Light Mode';
    }
    localStorage.setItem('darkmode', on ? '1' : '0');
}
(function() {
    let isDark = localStorage.getItem('darkmode') === '1';
    if (localStorage.getItem('darkmode') === null) {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    setDarkMode(isDark);
})();
if (darkmodeBtn) {
    darkmodeBtn.onclick = function() {
        setDarkMode(!document.body.classList.contains('darkmode'));
    };
}

// Floating scroll-to-top button logic
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
        if (scrollToTopBtn) scrollToTopBtn.style.display = 'flex';
    } else {
        if (scrollToTopBtn) scrollToTopBtn.style.display = 'none';
    }
});
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth scroll for navbar links
const navbarLinksA = document.querySelectorAll('.navbar-links a[href^="#"]');
navbarLinksA.forEach(function(link) {
    link.addEventListener('click', function(e) {
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Hamburger menu toggle logic
const navbarToggle = document.getElementById('navbar-toggle');
const headerEl = document.querySelector('header');
const navbarLinksEl = document.getElementById('navbar-links');

function updateHeaderPartialBlur() {
    if (!headerEl || !navbarLinksEl) return;
    const darkmodeBtn = document.getElementById('darkmode-toggle');
    // Always check for menu open on all screen sizes
    const isMenuOpen = window.getComputedStyle(navbarLinksEl).display !== 'none' && navbarLinksEl.classList.contains('show');
    if (isMenuOpen) {
        // Get the height of the navbar menu
        const menuRect = navbarLinksEl.getBoundingClientRect();
        // Set CSS variable for blur height
        headerEl.style.setProperty('--navbar-blur-height', menuRect.height + 'px');
        headerEl.classList.add('header-blur-partial');
        if (darkmodeBtn) darkmodeBtn.classList.add('blurred-toggle');
    } else {
        headerEl.classList.remove('header-blur-partial');
        headerEl.style.removeProperty('--navbar-blur-height');
        if (darkmodeBtn) darkmodeBtn.classList.remove('blurred-toggle');
    }
}

if (navbarToggle && navbarLinksEl) {
    navbarToggle.addEventListener('click', function() {
        navbarLinksEl.classList.toggle('show');
        setTimeout(updateHeaderPartialBlur, 10); // Wait for menu to open/close
    });
}
document.querySelectorAll('.navbar-links a').forEach(function(link) {
    link.addEventListener('click', function() {
        if (navbarLinksEl) navbarLinksEl.classList.remove('show');
        setTimeout(updateHeaderPartialBlur, 10);
    });
});
window.addEventListener('resize', updateHeaderPartialBlur);
window.addEventListener('DOMContentLoaded', updateHeaderPartialBlur);

// === Moving Particles Background ===
(function() {
    const canvas = document.getElementById('bg-cells');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    const PARTICLE_COUNT = Math.floor((width * height) / 3500);
    const COLORS = ['#bfa100', '#fffbe6', '#ffe066', '#fff9c4'];

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function randomBetween(a, b) {
        return a + Math.random() * (b - a);
    }

    function createParticle() {
        return {
            x: randomBetween(0, width),
            y: randomBetween(0, height),
            r: randomBetween(1.2, 2.8),
            dx: randomBetween(-0.3, 0.3),
            dy: randomBetween(-0.3, 0.3),
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(createParticle());
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.7;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }
    }

    function updateParticles() {
        for (let p of particles) {
            // Repel from mouse
            if (mouse.x !== null && mouse.y !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < REPEL_RADIUS) {
                    // Move particle away from mouse
                    const angle = Math.atan2(dy, dx);
                    const repelStrength = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_FORCE;
                    p.x += Math.cos(angle) * repelStrength * 2;
                    p.y += Math.sin(angle) * repelStrength * 2;
                }
            }
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > width) p.dx *= -1;
            if (p.y < 0 || p.y > height) p.dy *= -1;
        }
    }

    function animate() {
        drawParticles();
        updateParticles();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    resizeCanvas();
    initParticles();
    animate();
})();

// === Fade-in on scroll for .container ===
function fadeInOnScroll() {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < windowHeight - 60) {
            container.classList.add('fade-in');
        } else {
            container.classList.remove('fade-in');
        }
    });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);

// Modal for Mobile Application details
window.addEventListener('DOMContentLoaded', function() {
    const mobileAppPopup = document.getElementById('mobileapp-popup');
    const viewMoreLink = document.querySelector('.view-more-link');
    const closeMobileAppPopup = document.getElementById('close-mobileapp-popup');
    const popupImg = document.getElementById('mobileapp-popup-img');
    const popupDesc = document.getElementById('mobileapp-popup-desc');
    const nextBtn = document.getElementById('next-mobileapp-img');
    const prevBtn = document.getElementById('prev-mobileapp-img');
    const images = [
        'images/mobileapp1.png',
        'images/mobileapp2.png'
    ];
    const descriptions = [
        'MathMaster: Your Ultimate Math Learning Companion. Review lessons, explore core features, and get ready to level up your math skills!',
        'MathMaster: Take quizzes, practice mental math, and level up as you master new topics. Fun, interactive, and perfect for all ages!'
    ];
    let currentImg = 0;
    function showImg(idx) {
        if (!popupImg || !popupDesc) return;
        currentImg = (idx + images.length) % images.length;
        popupImg.style.opacity = 0.5;
        setTimeout(() => {
            popupImg.src = images[currentImg];
            popupDesc.textContent = descriptions[currentImg];
            popupImg.style.opacity = 1;
        }, 120);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showImg(currentImg + 1);
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showImg(currentImg - 1);
        });
    }
    if (viewMoreLink && mobileAppPopup) {
        viewMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            showImg(0);
            mobileAppPopup.style.display = 'flex';
        });
    }
    if (closeMobileAppPopup && mobileAppPopup) {
        closeMobileAppPopup.addEventListener('click', function() {
            mobileAppPopup.style.display = 'none';
        });
    }
    if (mobileAppPopup) {
        mobileAppPopup.addEventListener('click', function(e) {
            if (e.target === mobileAppPopup) mobileAppPopup.style.display = 'none';
        });
    }
});
