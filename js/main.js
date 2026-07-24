// Language toggle (persists across pages via localStorage)
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('langToggle');
  const saved = localStorage.getItem('santan-lang') || 'en';
  setLang(saved);

  if (toggle) {
    toggle.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      setLang(btn.dataset.lang);
    });
  }

  function setLang(lang) {
    root.dataset.lang = lang;
    localStorage.setItem('santan-lang', lang);
    if (toggle) {
      toggle.querySelectorAll('button').forEach((b) => {
        b.classList.toggle('active', b.dataset.lang === lang);
      });
    }
  }
})();

// Mobile nav toggle (animated hamburger -> floating card)
(function () {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (!navToggle || !mainNav) return;

  function setOpen(open) {
    mainNav.classList.toggle('open', open);
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  }

  navToggle.addEventListener('click', () => setOpen(!mainNav.classList.contains('open')));
  mainNav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => setOpen(false))
  );
  document.addEventListener('click', (e) => {
    if (!mainNav.classList.contains('open')) return;
    if (mainNav.contains(e.target) || navToggle.contains(e.target)) return;
    setOpen(false);
  });
})();

// About-section photo slideshow (auto-advance + dots, pauses on hover)
(function () {
  const wrap = document.getElementById('aboutSlideshow');
  if (!wrap) return;
  const slides = [...wrap.querySelectorAll('.slide')];
  const dots = [...wrap.querySelectorAll('.slideshow-dot')];
  if (slides.length < 2) return;

  let index = 0;
  let timer = null;

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('active', n === index));
    dots.forEach((d, n) => d.classList.toggle('active', n === index));
  }
  function start() { stop(); timer = setInterval(() => show(index + 1), 4500); }
  function stop() { if (timer) clearInterval(timer); }

  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));
  wrap.addEventListener('mouseenter', stop);
  wrap.addEventListener('mouseleave', start);
  start();
})();

// Highlight active category on the menu page while scrolling
(function () {
  const links = document.querySelectorAll('.category-nav a');
  if (!links.length) return;
  const sections = Array.from(links)
    .map((l) => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.remove('active'));
        const active = document.querySelector(`.category-nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      });
    },
    { rootMargin: '-150px 0px -70% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
})();
