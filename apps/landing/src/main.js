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

// ─── Product Data (for Lightbox) ─────────────────────────────────────
const PRODUCTS = {
  'extaro-300': {
    name: 'Zeiss EXTARO 300',
    brand: 'Zeiss',
    price: 'від €31,737',
    image: '/images/products/extaro-300-premium.png',
    url: 'https://edmi.com.ua/product/zeiss-extaro-300-essential-package/',
    description: 'Революційний стоматологічний мікроскоп з інтегрованою технологією флуоресценції. EXTARO 300 дозволяє візуалізувати каріозні ураження, тріщини та композитні реставрації у різних режимах освітлення. Apochromatic оптика забезпечує кристальну чіткість зображення без хроматичних аберацій. Вбудована 4K-камера для документації та навчання.',
    features: ['Fluorescence mode (5 режимів)', 'Вбудована 4K-камера', 'MORA interface для гнучкого позиціонування', 'Apochromatic оптика Carl Zeiss']
  },
  'flexion': {
    name: 'CJ-Optik Flexion TWIN',
    brand: 'CJ-Optik',
    price: 'від €25,000',
    image: '/images/products/cj-optik-flexion-twin.jpg',
    url: 'https://edmi.com.ua/product/cj-optik-flexion-twin/',
    description: 'Преміальний мікроскоп від німецького виробника CJ-Optik з моторизованим зумом та LED-освітленням нового покоління. Ергономічна конструкція Flexion забезпечує максимальний комфорт лікаря під час тривалих процедур. Full HD система документації дозволяє записувати відео та фото безпосередньо під час роботи.',
    features: ['Моторизований зум', 'LED освітлення нового покоління', 'Ергономічний дизайн Flexion', 'Full HD документація']
  },
  'proergo': {
    name: 'Zeiss EXTARO 300 Classic+',
    brand: 'Zeiss',
    price: 'від €39,643',
    image: '/images/products/extaro-300-mora.png',
    url: 'https://edmi.com.ua/product/zeiss-extaro-300-classic-package/',
    description: 'Комплектація EXTARO 300 Classic+ з розширеним набором функцій для мультидисциплінарного використання. Varioskop 200-400mm забезпечує оптимальну робочу відстань для різних спеціалізацій. Магнітні бленди дозволяють швидко змінювати конфігурацію оптики. Інтегрована HD-система для документації та телемедицини.',
    features: ['Varioskop 200-400mm', 'Мультидисциплінарний (ендодонтія, хірургія, протезування)', 'Магнітні бленди для швидкої зміни конфігурації', 'Інтегрований HD запис']
  },
  'advanced': {
    name: 'CJ-Optik Flexion Advanced',
    brand: 'CJ-Optik',
    price: 'від €19,200',
    image: '/images/products/cj-optik-flexion-advanced.jpg',
    url: 'https://edmi.com.ua/product/3578/',
    description: 'Компактний та потужний мікроскоп для клінік, що шукають оптимальне співвідношення ціни та якості. 6-ступеневий зум та широке поле зору забезпечують чітку візуалізацію на всіх етапах лікування. Стельове кріплення звільняє робочий простір. Ідеальний вибір для першого мікроскопа в клініці.',
    features: ['6-ступеневий зум', 'Широке поле зору', 'Компактний корпус', 'Стельове або настінне кріплення']
  }
};

// ─── Product Lightbox ────────────────────────────────────────────────
function initLightbox() {
  const lightbox = document.getElementById('product-lightbox');
  if (!lightbox) return;

  const overlay = lightbox.querySelector('.lightbox__overlay');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const imgEl = lightbox.querySelector('.lightbox__image');
  const brandEl = lightbox.querySelector('.lightbox__brand');
  const nameEl = lightbox.querySelector('.lightbox__name');
  const priceEl = lightbox.querySelector('.lightbox__price');
  const descEl = lightbox.querySelector('.lightbox__description');
  const featuresEl = lightbox.querySelector('.lightbox__features');
  const linkEl = lightbox.querySelector('.lightbox__link');
  const consultBtn = lightbox.querySelector('.lightbox__consult');

  function openLightbox(productId) {
    const product = PRODUCTS[productId];
    if (!product) return;

    imgEl.src = product.image;
    imgEl.alt = product.name;
    brandEl.textContent = product.brand;
    nameEl.textContent = product.name;
    priceEl.textContent = product.price;
    descEl.textContent = product.description;
    featuresEl.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
    linkEl.href = product.url;

    lightbox.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
  }

  // Open on "Детальніше" click
  document.querySelectorAll('[data-lightbox]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(btn.dataset.lightbox);
    });
  });

  // Close handlers
  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('lightbox--open')) {
      closeLightbox();
    }
  });

  // Simple focus trap
  lightbox.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = lightbox.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Scroll to contact from lightbox
  if (consultBtn) {
    consultBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeLightbox();
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// ─── Product Filters ─────────────────────────────────────────────────
function initFilters() {
  const filtersContainer = document.querySelector('.microscopes__filters');
  if (!filtersContainer) return;

  const chips = filtersContainer.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.microscopes__grid .product-card[data-brand]');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;

      // Update active chip
      chips.forEach(c => c.classList.remove('filter-chip--active'));
      chip.classList.add('filter-chip--active');

      // Show/hide cards
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.brand === filter) {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.style.display = '';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            if (!chip.classList.contains('filter-chip--active') || chip.dataset.filter !== filter) return;
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
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
  initLightbox();
  initFilters();

  // Language toggle buttons
  document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(currentLang === 'uk' ? 'en' : 'uk');
    });
  });
});

// Export for use in variant-specific scripts
export { setLang, currentLang, translations, showToast };
