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
const REPEL_RADIUS = 38;
const REPEL_FORCE = 3.5;
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
    } else {
        document.body.classList.remove('darkmode');
        setNavbarColors(false);
    }
    localStorage.setItem('darkmode', on ? '1' : '0');
}
setDarkMode(localStorage.getItem('darkmode') === '1');
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
if (navbarToggle && navbarLinks) {
    navbarToggle.addEventListener('click', function() {
        navbarLinks.classList.toggle('show');
    });
}
document.querySelectorAll('.navbar-links a').forEach(function(link) {
    link.addEventListener('click', function() {
        if (navbarLinks) navbarLinks.classList.remove('show');
    });
});
