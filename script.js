/* =====================================================
   Mohamed Galhoum — script.js (Rewall Style)
   ===================================================== */

// ===== SIDEBAR MOBILE =====
const mobMenuBtn = document.getElementById('mobMenuBtn');
const sidebar    = document.getElementById('sidebar');

mobMenuBtn?.addEventListener('click', () => {
  mobMenuBtn.classList.toggle('open');
  sidebar.classList.toggle('open');
});

// Close sidebar when nav link clicked on mobile
document.querySelectorAll('.snav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobMenuBtn?.classList.remove('open');
    sidebar?.classList.remove('open');
  });
});

// ===== SIDEBAR ACTIVE NAV =====
const sections  = document.querySelectorAll('.page-section[id]');
const snavLinks = document.querySelectorAll('.snav-link');

function updateSideNav() {
  const scrollY = window.scrollY + window.innerHeight * 0.35;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      snavLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.snav-link[data-section="${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateSideNav, { passive: true });
updateSideNav();

// ===== TYPING — SIDEBAR =====
const sideRoles = [
  'HR Coordinator',
  'Personnel Clerk',
  'Employee Relations',
  'HR Administrator',
  'ERP Systems User',
];

let sIdx = 0, sChar = 0, sDel = false;
const sideTypedEl = document.getElementById('sideTyped');

function sideType() {
  const cur = sideRoles[sIdx];
  const spd = sDel ? 55 : 95;
  if (!sDel) {
    sideTypedEl.textContent = cur.slice(0, sChar + 1);
    sChar++;
    if (sChar === cur.length) {
      sDel = true;
      setTimeout(sideType, 2200);
      return;
    }
  } else {
    sideTypedEl.textContent = cur.slice(0, sChar - 1);
    sChar--;
    if (sChar === 0) {
      sDel = false;
      sIdx = (sIdx + 1) % sideRoles.length;
    }
  }
  setTimeout(sideType, spd);
}
setTimeout(sideType, 800);

// ===== TYPING — HERO =====
const heroRoles = [
  'HR Coordinator',
  'Personnel Clerk',
  'Employee Relations',
  'HR Administrator',
  'ERP Systems User',
];

let hIdx = 0, hChar = 0, hDel = false;
const heroTypedEl = document.getElementById('heroTyped');

function heroType() {
  if (!heroTypedEl) return;
  const cur = heroRoles[hIdx];
  const spd = hDel ? 55 : 100;
  if (!hDel) {
    heroTypedEl.textContent = cur.slice(0, hChar + 1);
    hChar++;
    if (hChar === cur.length) { hDel = true; setTimeout(heroType, 2000); return; }
  } else {
    heroTypedEl.textContent = cur.slice(0, hChar - 1);
    hChar--;
    if (hChar === 0) { hDel = false; hIdx = (hIdx + 1) % heroRoles.length; }
  }
  setTimeout(heroType, spd);
}
setTimeout(heroType, 1200);

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      // Animate skill bars inside revealed item
      entry.target.querySelectorAll('.sfill').forEach(fill => {
        fill.style.width = (fill.dataset.w || 0) + '%';
      });
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.r').forEach(el => revealObserver.observe(el));

// ===== SKILLS TABS =====
const stabs = document.querySelectorAll('.stab');
const stabContents = document.querySelectorAll('.stab-content');

stabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    stabs.forEach(b => b.classList.remove('active'));
    stabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');

    const activeContent = document.getElementById(`stab-${target}`);
    activeContent.classList.add('active');

    // Trigger skill bar animation
    activeContent.querySelectorAll('.sfill').forEach(fill => {
      fill.style.width = '0';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        fill.style.width = (fill.dataset.w || 0) + '%';
      }));
    });

    // Re-trigger reveal for items in tab
    activeContent.querySelectorAll('.r').forEach(el => {
      el.classList.remove('in');
      setTimeout(() => el.classList.add('in'), 50);
    });
  });
});

// Animate initial skill bars on load
window.addEventListener('load', () => {
  document.querySelectorAll('.stab-content.active .sfill').forEach(fill => {
    setTimeout(() => { fill.style.width = (fill.dataset.w || 0) + '%'; }, 500);
  });
});



// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== STAGGER REVEAL for hero cards =====
document.querySelectorAll('.hcard').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  setTimeout(() => {
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 400 + i * 120);
});

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Mohamed Saeed Galhoum', 'font-size:16px;font-weight:bold;color:#c9a84c;');
console.log('%c📧 mdgalhoum@gmail.com  |  📞 +20 101 012 3245', 'color:#777;font-size:13px;');
