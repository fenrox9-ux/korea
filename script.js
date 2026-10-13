/* ============================================================
   KOREA AUTO — script.js
   Handles: mobile menu, car data render, filters, car modal,
   featured section, reviews/gallery render, contact form.
   ============================================================ */

(function () {
  'use strict';

  /* -------------------- DATA -------------------- */
  const CARS = [
    { id: 1, brand: 'Hyundai', model: 'Sonata', year: 2023, mileage: '12,400 km', fuel: 'Petrol', transmission: 'Automatic', price: '$18,500', body: 'Sedan',
      img: 'https://images.unsplash.com/photo-1659107647642-8800cfa0fb84?w=600&h=400&fit=crop&auto=format' },
    { id: 2, brand: 'Hyundai', model: 'Tucson', year: 2023, mileage: '8,200 km', fuel: 'Hybrid', transmission: 'Automatic', price: '$24,900', body: 'SUV',
      img: 'https://images.unsplash.com/photo-1767800890927-aebbe5540d61?w=600&h=400&fit=crop&auto=format' },
    { id: 3, brand: 'Hyundai', model: 'Santa Fe', year: 2022, mileage: '21,000 km', fuel: 'Diesel', transmission: 'Automatic', price: '$27,400', body: 'SUV',
      img: 'https://images.unsplash.com/photo-1611168935847-4bf3f7291cde?w=600&h=400&fit=crop&auto=format' },
    { id: 4, brand: 'Kia', model: 'K5', year: 2023, mileage: '6,800 km', fuel: 'Petrol', transmission: 'Automatic', price: '$21,200', body: 'Sedan',
      img: 'https://images.unsplash.com/photo-1659107377449-27ff3997070e?w=600&h=400&fit=crop&auto=format' },
    { id: 5, brand: 'Kia', model: 'Sportage', year: 2023, mileage: '9,500 km', fuel: 'Hybrid', transmission: 'Automatic', price: '$26,800', body: 'Crossover',
      img: 'https://images.unsplash.com/photo-1644749700856-a82a92828a1b?w=600&h=400&fit=crop&auto=format' },
    { id: 6, brand: 'Kia', model: 'Sorento', year: 2022, mileage: '18,300 km', fuel: 'Diesel', transmission: 'Automatic', price: '$29,500', body: 'SUV',
      img: 'https://images.unsplash.com/photo-1777175013535-d10633cdb9ac?w=600&h=400&fit=crop&auto=format' },
    { id: 7, brand: 'Genesis', model: 'G80', year: 2023, mileage: '4,200 km', fuel: 'Petrol', transmission: 'Automatic', price: '$48,900', body: 'Sedan',
      img: 'https://images.unsplash.com/photo-1774979300787-bd3563a085b8?w=600&h=400&fit=crop&auto=format' },
    { id: 8, brand: 'Genesis', model: 'GV80', year: 2023, mileage: '2,100 km', fuel: 'Petrol', transmission: 'Automatic', price: '$56,400', body: 'SUV',
      img: 'https://images.unsplash.com/photo-1592032857148-5658283bb67b?w=600&h=400&fit=crop&auto=format' },
  ];

  const BRANDS = ['All', 'Hyundai', 'Kia', 'Genesis'];
  const BODY_TYPES = ['All', 'Sedan', 'SUV', 'Hatchback', 'Crossover', 'Electric'];
  const FUELS = ['All', 'Petrol', 'Diesel', 'Hybrid', 'Electric'];
  const FEATURED_KEYS = ['Genesis G80', 'Genesis GV80', 'Hyundai Tucson', 'Kia K5'];

  const REVIEWS = [
    { name: 'Ahmed Al-Rashid', location: 'Dubai, UAE', rating: 5, car: 'Genesis G80 2023', avatar: 'AR',
      text: 'Korea Auto made importing my Genesis G80 completely stress-free. Professional team, transparent pricing, and the car arrived in perfect condition. Highly recommend!' },
    { name: 'Maria Santos', location: 'Lisbon, Portugal', rating: 5, car: 'Hyundai Tucson 2023', avatar: 'MS',
      text: 'I was nervous about importing a car from Korea, but the team guided me through every step. My Hyundai Tucson arrived 3 weeks earlier than expected. Excellent service!' },
    { name: 'Yusuf Okonkwo', location: 'Lagos, Nigeria', rating: 5, car: 'Kia Sportage 2022', avatar: 'YO',
      text: 'The inspection report was incredibly detailed — gave me full confidence before purchasing. Korea Auto has changed how I think about car imports. Second purchase on the way!' },
  ];

  const GALLERY = [
    { img: 'https://images.unsplash.com/photo-1645492693393-7c92e2ae4af9?w=800&h=600&fit=crop&auto=format', alt: 'Hyundai in tunnel', big: true },
    { img: 'https://images.unsplash.com/photo-1774979300787-bd3563a085b8?w=600&h=400&fit=crop&auto=format', alt: 'Car showroom interior', big: false },
    { img: 'https://images.unsplash.com/photo-1726248981877-30b6fbbd4a86?w=600&h=400&fit=crop&auto=format', alt: 'Korean car show', big: false },
    { img: 'https://images.unsplash.com/photo-1592032857148-5658283bb67b?w=600&h=400&fit=crop&auto=format', alt: 'Red car showroom', big: false },
    { img: 'https://images.unsplash.com/photo-1767800890927-aebbe5540d61?w=600&h=400&fit=crop&auto=format', alt: 'Luxury dark blue SUV', big: false },
  ];

  let state = { brand: 'All', body: 'All', fuel: 'All' };

  /* -------------------- HELPERS -------------------- */
  function el(tag, className, html) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* -------------------- MOBILE MENU -------------------- */
  function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    const iconMenu = toggle.querySelector('.icon-menu');
    const iconClose = toggle.querySelector('.icon-close');

    function setOpen(open) {
      navMobile.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      iconMenu.style.display = open ? 'none' : '';
      iconClose.style.display = open ? '' : 'none';
    }

    toggle.addEventListener('click', () => {
      setOpen(!navMobile.classList.contains('open'));
    });

    navMobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setOpen(false));
    });

    // Close mobile menu if window resizes to desktop width
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) setOpen(false);
    });
  }

  /* -------------------- FILTERS -------------------- */
  function buildFilterGroup(container, key, options) {
    const wrap = container.querySelector(`[data-filter="${key}"] .filter-options`);
    wrap.innerHTML = '';
    options.forEach(opt => {
      const btn = el('button', 'filter-btn' + (state[key] === opt ? ' active' : ''), escapeHtml(opt));
      btn.type = 'button';
      btn.dataset.value = opt;
      btn.addEventListener('click', () => {
        state[key] = opt;
        wrap.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.value === opt));
        renderCars();
      });
      wrap.appendChild(btn);
    });
  }

  function initFilters() {
    const filtersEl = document.getElementById('filters');
    buildFilterGroup(filtersEl, 'brand', BRANDS);
    buildFilterGroup(filtersEl, 'body', BODY_TYPES);
    buildFilterGroup(filtersEl, 'fuel', FUELS);
  }

  function getFilteredCars() {
    return CARS.filter(car => {
      if (state.brand !== 'All' && car.brand !== state.brand) return false;
      if (state.body !== 'All' && car.body !== state.body) return false;
      if (state.fuel !== 'All' && car.fuel !== state.fuel) return false;
      return true;
    });
  }

  /* -------------------- CAR CARDS -------------------- */
  function carCardHtml(car) {
    return `
      <div class="car-img-wrap">
        <img src="${car.img}" alt="${escapeHtml(car.brand)} ${escapeHtml(car.model)}" loading="lazy">
        <span class="car-brand-tag">${escapeHtml(car.brand)}</span>
      </div>
      <div class="car-body">
        <div class="car-head">
          <div>
            <h3>${escapeHtml(car.model)}</h3>
            <span class="car-year">${car.year}</span>
          </div>
          <span class="car-price">${escapeHtml(car.price)}</span>
        </div>
        <div class="car-specs">
          <span>⚡ ${escapeHtml(car.fuel)}</span>
          <span>⚙️ ${escapeHtml(car.transmission)}</span>
          <span>📏 ${escapeHtml(car.mileage)}</span>
          <span>🚗 ${escapeHtml(car.body)}</span>
        </div>
        <button type="button" class="btn-view" data-id="${car.id}">View Details</button>
      </div>`;
  }

  function renderCars() {
    const grid = document.getElementById('carGrid');
    const noResults = document.getElementById('noResults');
    const filtered = getFilteredCars();

    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.style.display = 'none';
      noResults.style.display = 'block';
      return;
    }

    grid.style.display = 'grid';
    noResults.style.display = 'none';

    filtered.forEach(car => {
      const card = el('div', 'car-card', carCardHtml(car));
      grid.appendChild(card);
    });

    grid.querySelectorAll('.btn-view').forEach(btn => {
      btn.addEventListener('click', () => openCarModal(Number(btn.dataset.id)));
    });
  }

  /* -------------------- FEATURED CARS -------------------- */
  function renderFeatured() {
    const wrap = document.getElementById('featuredGrid');
    wrap.innerHTML = '';
    const featured = CARS.filter(c => FEATURED_KEYS.includes(`${c.brand} ${c.model}`));

    featured.forEach(car => {
      const card = el('div', 'featured-card', `
        <img src="${car.img}" alt="${escapeHtml(car.brand)} ${escapeHtml(car.model)}" loading="lazy">
        <div class="featured-overlay"></div>
        <div class="featured-info">
          <div class="featured-brand">${escapeHtml(car.brand)}</div>
          <div class="featured-model">${escapeHtml(car.model)} ${car.year}</div>
          <div class="featured-meta">
            <span>${escapeHtml(car.mileage)} · ${escapeHtml(car.fuel)}</span>
            <span>${escapeHtml(car.price)}</span>
          </div>
        </div>
      `);
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => openCarModal(car.id));
      wrap.appendChild(card);
    });
  }

  /* -------------------- REVIEWS -------------------- */
  function starsHtml(count) {
    let s = '';
    for (let i = 0; i < count; i++) {
      s += '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
    }
    return s;
  }

  function renderReviews() {
    const wrap = document.getElementById('reviewsGrid');
    wrap.innerHTML = '';
    REVIEWS.forEach(r => {
      const card = el('div', 'review-card', `
        <div class="review-stars">${starsHtml(r.rating)}</div>
        <p class="review-text">"${escapeHtml(r.text)}"</p>
        <div class="review-footer">
          <div class="review-avatar">${escapeHtml(r.avatar)}</div>
          <div>
            <div class="review-name">${escapeHtml(r.name)}</div>
            <div class="review-meta">${escapeHtml(r.location)} · ${escapeHtml(r.car)}</div>
          </div>
        </div>
      `);
      wrap.appendChild(card);
    });
  }

  /* -------------------- GALLERY -------------------- */
  function renderGallery() {
    const wrap = document.getElementById('galleryGrid');
    wrap.innerHTML = '';
    GALLERY.forEach(item => {
      const div = el('div', 'gallery-item' + (item.big ? ' big' : ''), `
        <img src="${item.img}" alt="${escapeHtml(item.alt)}" loading="lazy">
        <div class="gallery-overlay"></div>
      `);
      wrap.appendChild(div);
    });
  }

  /* -------------------- CAR MODAL -------------------- */
  function openCarModal(id) {
    const car = CARS.find(c => c.id === id);
    if (!car) return;

    document.getElementById('modalImg').src = car.img;
    document.getElementById('modalImg').alt = `${car.brand} ${car.model}`;
    document.getElementById('modalBrand').textContent = car.brand;
    document.getElementById('modalTitle').textContent = car.model;
    document.getElementById('modalYear').textContent = car.year;
    document.getElementById('modalPrice').textContent = car.price;

    document.getElementById('modalSpecs').innerHTML = `
      <div class="spec">Fuel Type<b>${escapeHtml(car.fuel)}</b></div>
      <div class="spec">Transmission<b>${escapeHtml(car.transmission)}</b></div>
      <div class="spec">Mileage<b>${escapeHtml(car.mileage)}</b></div>
      <div class="spec">Body Type<b>${escapeHtml(car.body)}</b></div>
    `;

    // Pre-fill contact form model field for convenience
    const modelField = document.getElementById('fModel');
    if (modelField) modelField.value = `${car.brand} ${car.model}`;

    const overlay = document.getElementById('modalOverlay');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCarModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  function initModal() {
    document.getElementById('modalClose').addEventListener('click', closeCarModal);
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
      if (e.target.id === 'modalOverlay') closeCarModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeCarModal();
    });
    // "Request This Car" closes modal then lets the anchor scroll to #contact
    document.getElementById('modalRequestBtn').addEventListener('click', () => {
      closeCarModal();
    });
  }

  /* -------------------- CONTACT FORM -------------------- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const successBox = document.getElementById('contactSuccess');
    const sendAnotherBtn = document.getElementById('sendAnother');

    const nameInput = document.getElementById('fName');
    const phoneInput = document.getElementById('fPhone');
    const errName = document.getElementById('errName');
    const errPhone = document.getElementById('errPhone');

    function validate() {
      let valid = true;

      if (!nameInput.value.trim()) {
        errName.textContent = 'Please enter your full name.';
        nameInput.classList.add('invalid');
        valid = false;
      } else {
        errName.textContent = '';
        nameInput.classList.remove('invalid');
      }

      const phoneVal = phoneInput.value.trim();
      const phonePattern = /^[0-9+()\-\s]{6,}$/;
      if (!phoneVal) {
        errPhone.textContent = 'Please enter your phone number.';
        phoneInput.classList.add('invalid');
        valid = false;
      } else if (!phonePattern.test(phoneVal)) {
        errPhone.textContent = 'Please enter a valid phone number.';
        phoneInput.classList.add('invalid');
        valid = false;
      } else {
        errPhone.textContent = '';
        phoneInput.classList.remove('invalid');
      }

      return valid;
    }

    // Clear individual field errors as the user types
    [nameInput, phoneInput].forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('invalid');
        (input === nameInput ? errName : errPhone).textContent = '';
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;

      // Simulate sending — show success state
      form.style.display = 'none';
      successBox.style.display = 'flex';
    });

    sendAnotherBtn.addEventListener('click', () => {
      form.reset();
      successBox.style.display = 'none';
      form.style.display = 'flex';
    });
  }

  /* -------------------- HEADER SHADOW ON SCROLL (nice-to-have, no errors if absent) -------------------- */
  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,.25)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  /* -------------------- INIT -------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initFilters();
    renderCars();
    renderFeatured();
    renderReviews();
    renderGallery();
    initModal();
    initContactForm();
    initHeaderScroll();
  });

})();
