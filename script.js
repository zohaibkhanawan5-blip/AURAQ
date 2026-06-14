// ═══════════════════════════════════════════
//  AURAQ Website — JavaScript (Final Setup)
// ═══════════════════════════════════════════

// Your unique Google Sheets Web App link
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwb3xboktuhlm51eWkfRWIDX4bPsTOckeMVEaNxmsdSAQ-Ix2l8m8R_s8oyvz6ckezdnA/exec";

/* ── Navbar scroll effect ─────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Hamburger / mobile menu ─────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

/* ── Order total calculator ──────────────── */
const perfumeSelect = document.getElementById('perfume');
const qtySelect     = document.getElementById('qty');
const totalPrice    = document.getElementById('totalPrice');
const PER_BOTTLE    = 2500;

function updateTotal() {
  const qty    = parseInt(qtySelect.value) || 1;
  const choice = perfumeSelect.value;

  let basePrice = PER_BOTTLE;
  if (choice === 'Both') basePrice = PER_BOTTLE * 2;

  const total = basePrice * qty;
  totalPrice.textContent = 'Rs ' + total.toLocaleString('en-PK');
}

if (perfumeSelect && qtySelect) {
  perfumeSelect.addEventListener('change', updateTotal);
  qtySelect.addEventListener('change', updateTotal);
}

/* ── Main order form submit ──────────────── */
function submitOrder(e) {
  e.preventDefault();

  const form    = document.getElementById('orderForm');
  const success = document.getElementById('orderSuccess');

  // ── Collect form data ──────────────────
  const data = {
    name:    document.getElementById('fullName').value,
    phone:   document.getElementById('phone').value,
    email:   document.getElementById('email').value,
    city:    document.getElementById('city').value,
    address: document.getElementById('address').value,
    perfume: document.getElementById('perfume').value,
    qty:     document.getElementById('qty').value,
    notes:   document.getElementById('notes').value,
    total:   totalPrice.textContent
  };

  // ── Save order to localStorage ─────────
  const orders = JSON.parse(localStorage.getItem('auraq_orders') || '[]');
  orders.push(data);
  localStorage.setItem('auraq_orders', JSON.stringify(orders));

  // ── Send order data to Google Sheets ───
  fetch(GOOGLE_SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(() => console.log('Main order sent to Google Sheet successfully'))
  .catch(error => console.error('Error sending data:', error));

  // ── Show success UI ────────────────────
  form.style.display = 'none';
  success.style.display = 'block';

  // Scroll to success message
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function resetForm() {
  const form    = document.getElementById('orderForm');
  const success = document.getElementById('orderSuccess');
  form.reset();
  updateTotal();
  form.style.display = 'block';
  success.style.display = 'none';
}

/* ── Quick-order modal ───────────────────── */
const modalOverlay = document.getElementById('modalOverlay');

function openOrder(perfumeName) {
  document.getElementById('modalTitle').textContent = 'Order ' + perfumeName;
  document.getElementById('mPerfume').value = perfumeName;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function submitQuickOrder(e) {
  e.preventDefault();

  // Mapping layout to match main order form structure
  const data = {
    name:    document.getElementById('mName').value,
    phone:   document.getElementById('mPhone').value,
    email:   "Not Provided",
    city:    "Not Provided",
    address: document.getElementById('mAddress').value,
    perfume: document.getElementById('mPerfume').value,
    qty:     "1",
    total:   'Rs 2,500',
    notes:   "Quick Modal Order"
  };

  // Save order to localStorage
  const orders = JSON.parse(localStorage.getItem('auraq_orders') || '[]');
  orders.push(data);
  localStorage.setItem('auraq_orders', JSON.stringify(orders));

  // ── Send quick order data to Google Sheets ───
  fetch(GOOGLE_SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(() => console.log('Quick order sent to Google Sheet successfully'))
  .catch(error => console.error('Error sending quick order:', error));

  closeModal();
  alert(`✅ Order received for ${data.perfume}!\nWe will call ${data.phone} within 24 hours.`);
  e.target.reset();
}

/* ── Smooth-scroll for anchor links ──────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // height of fixed navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Scroll reveal animations ────────────── */
const revealEls = document.querySelectorAll(
  '.perfume-card, .about-card, .order-form, .about-text'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});