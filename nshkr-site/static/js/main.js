/* North Shore Hackerspace — progressive enhancement only. */
(function () {
  'use strict';

  var reduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Sticky nav treatment once scrolled past the top. */
  var nav = document.getElementById('nav');
  if (nav) {
    var sync = function () {
      nav.classList.toggle('is-stuck', window.scrollY > 12);
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
  }

  /* Reveal sections as they enter the viewport. */
  var targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  targets.forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms';
    io.observe(el);
  });
})();
