/* ============================================================
   9mmRIOT - Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHamburger();
  initSmoothScroll();
  initScrollAnimations();
  initCountUp();
  initBackToTop();
  initParticles();
  initNews();

  // FOUC防止: CSS読み込み完了後に表示
  document.body.classList.add('is-loaded');
});

/* ---------- Header scroll effect ---------- */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }
}

/* ---------- Hamburger menu ---------- */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('globalNav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('is-open');
    document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
  });

  // Close menu when clicking a nav link
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

/* ---------- Smooth scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = document.getElementById('header')?.offsetHeight || 70;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* ---------- Scroll animations (Intersection Observer) ---------- */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay');
        if (delay) {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, parseInt(delay));
        } else {
          entry.target.classList.add('is-visible');
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    '[data-aos], .about-content, .event-card-next, .movie-content, .contact-content, .past-event-card'
  );

  animatedElements.forEach(el => observer.observe(el));
}

/* ---------- Count up animation ---------- */
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        animateCount(el, 0, target, 1500);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCount(el, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);

    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ---------- Back to top ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });
}

/* ---------- NEWS (JSON読み込み) ---------- */
function initNews() {
  // news.json のパスを判定（トップページかサブページか）
  const isSubPage = location.pathname.includes('/pages/');
  const jsonPath = isSubPage ? '../news.json' : 'news.json';

  // トップページ用の表示先（最新3件）
  const topList = document.getElementById('newsListTop');
  // NEWS一覧ページ用の表示先（全件）
  const fullList = document.getElementById('newsListFull');

  if (!topList && !fullList) return;

  fetch(jsonPath)
    .then(res => res.json())
    .then(data => {
      if (topList) renderNewsList(topList, data.slice(0, 3));
      if (fullList) {
        renderNewsList(fullList, data);
        initNewsFilter(fullList);
      }
    })
    .catch(() => {
      // fetch 失敗時（ローカルfile://の場合）はHTMLに書かれたフォールバックをそのまま表示
    });
}

function renderNewsList(container, items) {
  container.innerHTML = items.map(item => {
    const tagClass = getTagClass(item.tag);
    const linkStart = item.link ? `<a href="${item.link}" class="news-link"${item.link.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>` : '<span class="news-link">';
    const linkEnd = item.link ? '</a>' : '</span>';

    return `
      <li class="news-item is-visible" data-category="${item.tag.toLowerCase()}">
        <span class="news-date">${item.date}</span>
        <span class="news-tag ${tagClass}">${item.tag}</span>
        ${linkStart}${item.text}${linkEnd}
      </li>
    `;
  }).join('');
}

function getTagClass(tag) {
  const map = {
    'EVENT': 'tag-event',
    'INFO': 'tag-info',
    'ENTRY': 'tag-entry',
    'MEDIA': 'tag-media'
  };
  return map[tag.toUpperCase()] || 'tag-info';
}

function initNewsFilter(listContainer) {
  document.querySelectorAll('.news-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.news-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      listContainer.querySelectorAll('.news-item').forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ---------- Hero particles ---------- */
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(196, 30, 58, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    container.appendChild(particle);
  }

  // Add particle animation keyframes
  if (!document.getElementById('particleStyles')) {
    const style = document.createElement('style');
    style.id = 'particleStyles';
    style.textContent = `
      @keyframes particleFloat {
        0%, 100% {
          transform: translate(0, 0) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        50% {
          transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 100 + 50}px, -${Math.random() * 150 + 50}px) scale(1.5);
          opacity: 0.6;
        }
        90% {
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
