// ========================
// Hope Revealed - Dynamic & Modern Interactive Features
// ========================

(function() {
    'use strict';

    // ---------- DOM Elements ----------
    const yearSpan = document.getElementById('year');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const contactForm = document.getElementById('contactForm');
    const donateAmtBtns = document.querySelectorAll('.donate-amt');
    const customAmountField = document.getElementById('customAmount');
    const donateNowBtn = document.getElementById('donateNowBtn');
    const donorNameInput = document.getElementById('donorName');
    const monthlyCheck = document.getElementById('monthlyCheck');

    // ---------- Utility Functions ----------
    function setCopyrightYear() {
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    // Smooth scroll for all anchor links (internal navigation)
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        // Optional: update URL without jumping
                        history.pushState(null, null, targetId);
                    }
                }
            });
        });
    }

    // Mobile menu toggle with animation & accessibility
    function initMobileMenu() {
        if (mobileMenuBtn && nav) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isExpanded = nav.classList.toggle('show');
                mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
                mobileMenuBtn.innerHTML = isExpanded ? '✕' : '☰';
                // Prevent body scroll when menu is open on mobile
                if (isExpanded) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (nav.classList.contains('show') && !nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    nav.classList.remove('show');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.innerHTML = '☰';
                    document.body.style.overflow = '';
                }
            });

            // Close menu on window resize if needed
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && nav.classList.contains('show')) {
                    nav.classList.remove('show');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.innerHTML = '☰';
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Modern contact form handler with validation & feedback animation
    function initContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Get form fields
                const name = contactForm.querySelector('#contactName')?.value.trim() || '';
                const email = contactForm.querySelector('#contactEmail')?.value.trim() || '';
                const message = contactForm.querySelector('#contactMessage')?.value.trim() || '';
                
                // Basic validation
                let feedbackMsg = '';
                if (!name) feedbackMsg = 'Please enter your name.';
                else if (!email || !email.includes('@')) feedbackMsg = 'Please enter a valid email address.';
                else if (!message) feedbackMsg = 'Please enter your message.';
                
                const feedbackDiv = contactForm.querySelector('.form-feedback') || (() => {
                    const fd = document.createElement('div');
                    fd.className = 'form-feedback';
                    contactForm.appendChild(fd);
                    return fd;
                })();
                
                if (feedbackMsg) {
                    feedbackDiv.textContent = `⚠️ ${feedbackMsg}`;
                    feedbackDiv.style.color = '#c0392b';
                    feedbackDiv.style.backgroundColor = '#ffe6e5';
                    feedbackDiv.style.display = 'block';
                    setTimeout(() => {
                        feedbackDiv.style.opacity = '0';
                        setTimeout(() => { feedbackDiv.style.display = 'none'; feedbackDiv.style.opacity = '1'; }, 300);
                    }, 3500);
                    return;
                }
                
                // Simulate sending (replace with actual fetch if needed)
                feedbackDiv.textContent = '⏳ Sending message...';
                feedbackDiv.style.color = '#c96f0d';
                feedbackDiv.style.backgroundColor = '#fff3e0';
                feedbackDiv.style.display = 'block';
                
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));
                
                feedbackDiv.innerHTML = '✅ Message sent successfully! We will reply within 24 hours. 🙏';
                feedbackDiv.style.color = '#2c5f2d';
                feedbackDiv.style.backgroundColor = '#e8f3e4';
                contactForm.reset();
                
                setTimeout(() => {
                    feedbackDiv.style.opacity = '0';
                    setTimeout(() => { feedbackDiv.style.display = 'none'; feedbackDiv.style.opacity = '1'; }, 300);
                }, 5000);
            });
        }
    }

    // Modern donation handler with dynamic amount selection
    function initDonationModule() {
        let selectedAmount = null;
        
        if (donateAmtBtns.length) {
            donateAmtBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const isCustom = btn.dataset.custom === 'true';
                    
                    // Reset all button styles
                    donateAmtBtns.forEach(b => {
                        b.classList.remove('active-amount');
                        b.style.background = '';
                        b.style.color = '';
                    });
                    
                    if (isCustom && customAmountField) {
                        customAmountField.style.display = 'block';
                        customAmountField.focus();
                        selectedAmount = null;
                        btn.classList.add('active-amount');
                        btn.style.background = '#2c5f2d';
                        btn.style.color = 'white';
                    } else {
                        if (customAmountField) customAmountField.style.display = 'none';
                        selectedAmount = btn.dataset.amt;
                        btn.classList.add('active-amount');
                        btn.style.background = '#c96f0d';
                        btn.style.color = 'white';
                    }
                });
            });
            
            if (customAmountField) {
                customAmountField.addEventListener('input', (e) => {
                    let val = e.target.value;
                    if (val && !isNaN(val) && parseFloat(val) > 0) {
                        selectedAmount = parseFloat(val).toFixed(0);
                    } else {
                        selectedAmount = null;
                    }
                });
            }
        }
        
        if (donateNowBtn) {
            donateNowBtn.addEventListener('click', async () => {
                let finalAmount = selectedAmount;
                if (customAmountField && customAmountField.style.display === 'block') {
                    const customVal = customAmountField.value.trim();
                    if (customVal && !isNaN(parseFloat(customVal)) && parseFloat(customVal) > 0) {
                        finalAmount = parseFloat(customVal).toFixed(0);
                    } else {
                        finalAmount = null;
                    }
                }
                
                const donorName = donorNameInput?.value.trim() || 'generous supporter';
                const isMonthly = monthlyCheck?.checked || false;
                
                if (!finalAmount || finalAmount <= 0) {
                    // Show modern toast-like alert
                    showFloatingMessage('Please select or enter a valid donation amount 💙', '#c0392b');
                    return;
                }
                
                // Animate button feedback
                donateNowBtn.innerHTML = '⏳ Processing...';
                donateNowBtn.disabled = true;
                
                await new Promise(resolve => setTimeout(resolve, 600));
                
                showFloatingMessage(`✨ Thank you, ${donorName}! Your ${isMonthly ? 'monthly ❤️ ' : ''}donation of $${finalAmount} will bring hope and transformation to Uganda. 🙌`, '#2c5f2d');
                
                // Reset donation form
                donateAmtBtns.forEach(b => {
                    b.classList.remove('active-amount');
                    b.style.background = '';
                    b.style.color = '';
                });
                if (customAmountField) {
                    customAmountField.style.display = 'none';
                    customAmountField.value = '';
                }
                if (donorNameInput) donorNameInput.value = '';
                if (monthlyCheck) monthlyCheck.checked = false;
                selectedAmount = null;
                
                donateNowBtn.innerHTML = '💝 Donate Now';
                donateNowBtn.disabled = false;
            });
        }
    }
    
    // Floating message helper (modern snackbar)
    function showFloatingMessage(text, bgColor) {
        const existingMsg = document.querySelector('.floating-toast');
        if (existingMsg) existingMsg.remove();
        
        const toast = document.createElement('div');
        toast.className = 'floating-toast';
        toast.textContent = text;
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = bgColor;
        toast.style.color = 'white';
        toast.style.padding = '14px 28px';
        toast.style.borderRadius = '60px';
        toast.style.fontWeight = '500';
        toast.style.boxShadow = '0 12px 28px rgba(0,0,0,0.2)';
        toast.style.zIndex = '9999';
        toast.style.backdropFilter = 'blur(4px)';
        toast.style.fontFamily = 'system-ui, sans-serif';
        toast.style.fontSize = '0.95rem';
        toast.style.maxWidth = '90%';
        toast.style.textAlign = 'center';
        toast.style.letterSpacing = '0.3px';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 400);
        }, 3800);
    }

    // Lazy loading images with fade-in effect
    function initLazyLoading() {
        const images = document.querySelectorAll('img');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('lazy-loaded');
                        img.style.opacity = '1';
                        imageObserver.unobserve(img);
                    }
                });
            }, { threshold: 0.1, rootMargin: '50px' });
            
            images.forEach(img => {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease-in-out';
                if (img.complete && img.naturalHeight !== 0) {
                    img.classList.add('lazy-loaded');
                    img.style.opacity = '1';
                } else {
                    imageObserver.observe(img);
                }
                img.setAttribute('loading', 'lazy');
            });
        } else {
            images.forEach(img => img.setAttribute('loading', 'lazy'));
        }
    }

    // Animated stats counter for home page & any .stat-number elements
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number, .stats span, .stat-item[data-count]');
        if (!statNumbers.length) return;
        
        const animateNumber = (element) => {
            const rawText = element.innerText || element.textContent;
            const match = rawText.match(/\d+/);
            if (!match) return;
            const targetVal = parseInt(match[0], 10);
            if (isNaN(targetVal)) return;
            
            let current = 0;
            const increment = Math.ceil(targetVal / 40);
            const suffix = rawText.replace(/[\d]/g, '');
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetVal) {
                    element.innerText = targetVal + suffix;
                    clearInterval(timer);
                } else {
                    element.innerText = current + suffix;
                }
            }, 25);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(el => observer.observe(el));
    }

    // Scroll reveal animation (modern fade-up)
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.card, .leader-card, .values-grid div, .program-card, .about-story, .impact-snapshot');
        if (!revealElements.length) return;
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(25px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.classList.add('scroll-reveal');
            revealObserver.observe(el);
        });
    }
    
    function applyRevealStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .scroll-reveal.revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            .donate-amt.active-amount {
                transform: scale(0.98);
                transition: all 0.1s ease;
            }
            nav.show {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 80px;
                left: 0;
                right: 0;
                background: white;
                padding: 1.5rem;
                gap: 1.2rem;
                box-shadow: 0 20px 30px rgba(0,0,0,0.08);
                z-index: 1000;
                border-radius: 0 0 24px 24px;
            }
            @media (max-width: 768px) {
                nav {
                    display: none;
                }
                .mobile-menu-btn {
                    display: block;
                }
            }
            .floating-toast {
                animation: slideUpFade 0.3s ease;
            }
            @keyframes slideUpFade {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            button, .donate-amt, .cta {
                transition: all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            }
            button:active, .donate-amt:active {
                transform: scale(0.96);
            }
        `;
        document.head.appendChild(style);
    }

    // Dynamic header shadow on scroll
    function initHeaderShadow() {
        const header = document.querySelector('header');
        if (!header) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
                header.style.transition = 'box-shadow 0.2s';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

    // Interactive hover animations for buttons (micro-interactions)
    function initMicroInteractions() {
        const allButtons = document.querySelectorAll('button, .cta, .donate-amt');
        allButtons.forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                if (btn.style.transform !== 'scale(0.96)') {
                    btn.style.transform = 'translateY(-2px)';
                }
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // Initialize everything on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        setCopyrightYear();
        initSmoothScroll();
        initMobileMenu();
        initContactForm();
        initDonationModule();
        initLazyLoading();
        initStatsCounter();
        initScrollReveal();
        applyRevealStyles();
        initHeaderShadow();
        initMicroInteractions();
        
        // Add a small console greeting (optional modern touch)
        console.log('🌿 Hope Revealed — Dynamic website ready | Bringing transformation through faith & action');
    });
})();
