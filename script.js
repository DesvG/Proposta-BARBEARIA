/* ============================================================
   [NOME DA BARBEARIA] — Landing Page
   JavaScript vanilla, sem dependências externas
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 1. ANO DINÂMICO ---------- */
  const anoEl = document.getElementById('ano');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  /* ---------- 2. HEADER — SOMBRA AO ROLAR ---------- */
  const header = document.getElementById('header');
  if (header) {
    let ticking = false;
    const onScroll = function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          header.classList.toggle('is-scrolled', window.scrollY > 12);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 3. FAQ ACCORDION ---------- */
  const faqQuestions = document.querySelectorAll('.faq__question');
  faqQuestions.forEach(function (button) {
    button.addEventListener('click', function () {
      const item = button.closest('.faq__item');
      const answer = document.getElementById(button.getAttribute('aria-controls'));
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq__item.is-open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          const openBtn = openItem.querySelector('.faq__question');
          const openAns = document.getElementById(openBtn.getAttribute('aria-controls'));
          openBtn.setAttribute('aria-expanded', 'false');
          if (openAns) openAns.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      document.querySelectorAll('.faq__item.is-open .faq__answer').forEach(function (answer) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      });
    }, 150);
  });

  /* ---------- 4. REVEAL ANIMATION ---------- */
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealElements.length) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(function (el) { observer.observe(el); });
  } else {
    revealElements.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 5. SCROLL SUAVE PARA LINKS INTERNOS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const headerOffset = (header ? header.offsetHeight : 0) + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: top, behavior: 'smooth' });
      if (history.replaceState) history.replaceState(null, '', targetId);
    });
  });

  /* ---------- 6. FEEDBACK TÁTIL NO WHATSAPP ---------- */
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navigator.vibrate) navigator.vibrate(10);
    });
  });

})();
