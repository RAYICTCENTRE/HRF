// script.js - Interactive features for Hope Revealed website

// Set copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

// Contact form handling (client-side demo)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedback = contactForm.querySelector('.form-feedback');
    feedback.style.display = 'block';
    feedback.textContent = '✅ Thank you! Your message has been received. We will respond within 48 hours.';
    feedback.style.color = 'green';
    contactForm.reset();
    setTimeout(() => { feedback.style.display = 'none'; }, 4000);
  });
}

// Donation page logic
const donateAmtBtns = document.querySelectorAll('.donate-amt');
const customAmountField = document.getElementById('customAmount');
let selectedAmount = null;

if (donateAmtBtns.length) {
  donateAmtBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isCustom = btn.dataset.custom === 'true';
      if (isCustom) {
        customAmountField.style.display = 'block';
        customAmountField.focus();
        selectedAmount = null;
      } else {
        customAmountField.style.display = 'none';
        selectedAmount = btn.dataset.amt;
        donateAmtBtns.forEach(b => b.style.background = '#f0f0f0');
        btn.style.background = 'var(--green)';
        btn.style.color = 'white';
      }
    });
  });

  if (customAmountField) {
    customAmountField.addEventListener('input', (e) => {
      selectedAmount = e.target.value;
    });
  }

  const donateNow = document.getElementById('donateNowBtn');
  if (donateNow) {
    donateNow.addEventListener('click', () => {
      let finalAmount = selectedAmount;
      if (customAmountField && customAmountField.style.display === 'block') {
        finalAmount = customAmountField.value;
      }
      const donorName = document.getElementById('donorName')?.value || 'Friend';
      const isMonthly = document.getElementById('monthlyCheck')?.checked;
      if (!finalAmount || finalAmount <= 0) {
        alert('Please select or enter a donation amount.');
        return;
      }
      alert(`✨ Thank you, ${donorName}! Your ${isMonthly ? 'monthly ' : ''}donation of $${finalAmount} brings hope to Uganda. (Demo - payment integration ready).`);
    });
  }
}

// Smooth scroll for any anchor links (if internal)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href') !== '#') {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Optional: Image lazy placeholders
const images = document.querySelectorAll('img');
images.forEach(img => {
  img.setAttribute('loading', 'lazy');
});

// Dynamic stats animation on home (if stats visible)
const statNumbers = document.querySelectorAll('.stats span');
if (statNumbers.length) {
  const animateNumbers = () => {
    statNumbers.forEach(el => {
      const final = el.innerText.replace(/[^0-9+]/g, '');
      if (final && !el.dataset.animated) {
        el.dataset.animated = 'true';
        let current = 0;
        const target = parseInt(final) || 100;
        const increment = target / 30;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.innerText = target + (final.includes('+') ? '+' : '');
            clearInterval(timer);
          } else {
            el.innerText = Math.floor(current);
          }
        }, 20);
      }
    });
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateNumbers();
    });
  }, { threshold: 0.3 });
  const statsSection = document.querySelector('.stats');
  if (statsSection) observer.observe(statsSection);
}