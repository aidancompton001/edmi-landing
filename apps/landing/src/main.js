// EDMI Landing Page — Main JS
// Language switcher, scroll animations, counter animation, form handler

import ukData from './i18n/uk.json';
import enData from './i18n/en.json';

const translations = { uk: ukData, en: enData };

// ─── Language Switcher ───────────────────────────────────────────────
let currentLang = localStorage.getItem('edmi-lang') || 'uk';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('edmi-lang', lang);
  document.documentElement.lang = lang;
  applyTranslations();
  updateLangToggle();
}

function applyTranslations() {
  const t = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedValue(t, key);
    if (value) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    }
  });
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function updateLangToggle() {
  document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
    btn.textContent = currentLang === 'uk' ? 'EN' : 'UA';
  });
}

// ─── Scroll Animations (IntersectionObserver) ────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Don't unobserve — allows re-animation if needed
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

// ─── Counter Animation ──────────────────────────────────────────────
function initCounters() {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-counter]').forEach(el => {
    counterObserver.observe(el);
  });
}

function animateCounter(el) {
  const target = el.getAttribute('data-counter');
  const hasPlus = target.includes('+');
  const num = parseInt(target.replace(/[^0-9]/g, ''), 10);
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * num);

    el.textContent = current.toLocaleString() + (hasPlus ? '+' : '');

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ─── Form Handler (Telegram webhook) ─────────────────────────────────
function initFormHandler() {
  document.querySelectorAll('[data-contact-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;
      const t = translations[currentLang];

      submitBtn.disabled = true;
      submitBtn.textContent = t.form.sending;

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        message: formData.get('message') || ''
      };

      try {
        // Telegram webhook — replace BOT_TOKEN and CHAT_ID with real values
        const BOT_TOKEN = form.dataset.botToken || '';
        const CHAT_ID = form.dataset.chatId || '';

        if (BOT_TOKEN && CHAT_ID) {
          const text = `📩 Нова заявка з лендингу EDMI\n\n👤 ${data.name}\n📱 ${data.phone}\n💬 ${data.message || '—'}`;
          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' })
          });
        }

        // Show success toast
        showToast(t.form.success, 'success');
        form.reset();
      } catch {
        showToast(t.form.error, 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  });
}

// ─── Toast Notification ─────────────────────────────────────────────
function showToast(message, type = 'success') {
  const existing = document.querySelector('.edmi-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `edmi-toast edmi-toast--${type}`;
  toast.textContent = message;
  toast.setAttribute('role', 'alert');
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('edmi-toast--visible');
  });

  setTimeout(() => {
    toast.classList.remove('edmi-toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ─── Smooth Scroll Navigation ───────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Close mobile menu if open
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });
}

// ─── Mobile Menu Toggle ─────────────────────────────────────────────
function initMobileMenu() {
  document.querySelectorAll('[data-menu-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const menu = document.querySelector('[data-mobile-menu]');
      if (menu) menu.classList.toggle('hidden');
    });
  });
}

// ─── Header Scroll Effect ───────────────────────────────────────────
function initHeaderScroll() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

// ─── Init Everything ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);
  initScrollAnimations();
  initCounters();
  initFormHandler();
  initSmoothScroll();
  initMobileMenu();
  initHeaderScroll();

  // Language toggle buttons
  document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(currentLang === 'uk' ? 'en' : 'uk');
    });
  });
});

// Export for use in variant-specific scripts
export { setLang, currentLang, translations, showToast };
