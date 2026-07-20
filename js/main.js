/* ===== LumiArchi — scripts (refonte 2026) ===== */
document.addEventListener('DOMContentLoaded', function () {

  /* ---- Menu mobile ---- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () { menu.classList.toggle('open'); });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  /* ---- Hero carrousel ---- */
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length) {
    var i = 0, timer;
    var show = function (n) {
      slides[i].classList.remove('active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active');
    };
    var next = function () { show(i + 1); };
    var prev = function () { show(i - 1); };
    var start = function () { timer = setInterval(next, 5000); };
    var reset = function () { clearInterval(timer); start(); };
    var bn = document.querySelector('.hero-next'), bp = document.querySelector('.hero-prev');
    if (bn) bn.addEventListener('click', function () { next(); reset(); });
    if (bp) bp.addEventListener('click', function () { prev(); reset(); });
    start();
  }

  /* ---- Bilingue FR / EN ---- */
  var setLang = function (lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.dataset.fr) el.dataset.fr = el.innerHTML;
      el.innerHTML = (lang === 'en') ? el.dataset.en : el.dataset.fr;
    });
    document.querySelectorAll('[data-en-ph]').forEach(function (el) {
      if (!el.dataset.frPh) el.dataset.frPh = el.getAttribute('placeholder') || '';
      el.setAttribute('placeholder', lang === 'en' ? el.dataset.enPh : el.dataset.frPh);
    });
    document.querySelectorAll('.nav-lang button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    try { localStorage.setItem('la_lang', lang); } catch (e) {}
  };
  document.querySelectorAll('.nav-lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });
  var saved = 'fr';
  try { saved = localStorage.getItem('la_lang') || 'fr'; } catch (e) {}
  setLang(saved);

  /* ---- Portfolio : filtres ---- */
  var filters = document.querySelectorAll('.pf-filters button');
  var items = document.querySelectorAll('.pf-item');
  if (filters.length) {
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.dataset.filter;
        items.forEach(function (it) {
          it.style.display = (cat === 'all' || it.dataset.cat === cat) ? '' : 'none';
        });
      });
    });
  }

  /* ---- Portfolio : lightbox ---- */
  var lb = document.querySelector('.lb');
  if (lb && items.length) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb-cap');
    var visible = [], cur = 0;
    var open = function (el) {
      visible = Array.prototype.filter.call(items, function (it) { return it.style.display !== 'none'; });
      cur = visible.indexOf(el);
      render();
      lb.classList.add('open');
    };
    var render = function () {
      var el = visible[cur];
      lbImg.src = el.querySelector('img').src;
      lbCap.textContent = el.dataset.title || '';
    };
    items.forEach(function (it) {
      it.addEventListener('click', function () { open(it); });
    });
    lb.querySelector('.lb-close').addEventListener('click', function () { lb.classList.remove('open'); });
    lb.querySelector('.lb-next').addEventListener('click', function () { cur = (cur + 1) % visible.length; render(); });
    lb.querySelector('.lb-prev').addEventListener('click', function () { cur = (cur - 1 + visible.length) % visible.length; render(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.classList.remove('open'); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') lb.classList.remove('open');
      if (e.key === 'ArrowRight') { cur = (cur + 1) % visible.length; render(); }
      if (e.key === 'ArrowLeft') { cur = (cur - 1 + visible.length) % visible.length; render(); }
    });
  }

  /* ---- Année footer ---- */
  document.querySelectorAll('.year').forEach(function (y) { y.textContent = new Date().getFullYear(); });
});
