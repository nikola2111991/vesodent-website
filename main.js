/**
 * VesoDent - Main JavaScript
 * Modern interactions and animations
 */

(function() {
    'use strict';

    // ========================================
    // DOM Ready
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        initNavbar();
        initMobileMenu();
        initScrollAnimations();
        initMagneticButtons();
        initParallax();
        initFAQ();
        initContactForm();
        initCookieConsent();
    });

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        let lastScroll = 0;
        const scrollThreshold = 50;

        function handleScroll() {
            const currentScroll = window.pageYOffset;

            // Add scrolled class
            if (currentScroll > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
    }

    // ========================================
    // Mobile Menu
    // ========================================
    function initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (!menuBtn || !mobileMenu) return;

        function toggleMenu() {
            const isOpen = mobileMenu.classList.contains('open');

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        function openMenu() {
            mobileMenu.classList.add('open');
            menuBtn.classList.add('mobile-menu-open');
            document.body.style.overflow = 'hidden';
            menuBtn.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            mobileMenu.classList.remove('open');
            menuBtn.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
            menuBtn.setAttribute('aria-expanded', 'false');
        }

        menuBtn.addEventListener('click', toggleMenu);

        // Close menu on link click
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                closeMenu();
            }
        });

        // Close menu on resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768 && mobileMenu.classList.contains('open')) {
                closeMenu();
            }
        });
    }

    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-up');

        if (!animatedElements.length) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: unobserve after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // ========================================
    // Magnetic Buttons
    // ========================================
    function initMagneticButtons() {
        const magneticBtns = document.querySelectorAll('.magnetic-btn');

        if (!magneticBtns.length || window.innerWidth < 1024) return;

        magneticBtns.forEach(function(btn) {
            btn.addEventListener('mousemove', function(e) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
            });

            btn.addEventListener('mouseleave', function() {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ========================================
    // Parallax Effect (Hero Image)
    // ========================================
    function initParallax() {
        const heroImage = document.querySelector('.hero-image');

        if (!heroImage || window.innerWidth < 768) return;

        let ticking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const speed = 0.3;
            const yPos = scrolled * speed;

            heroImage.style.transform = 'translateY(' + yPos + 'px)';
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // ========================================
    // FAQ Accordion
    // ========================================
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        if (!faqItems.length) return;

        faqItems.forEach(function(item) {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (!question || !answer) return;

            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('open');

                // Close all other items
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.classList.add('hidden');
                        }
                    }
                });

                // Toggle current item
                if (isOpen) {
                    item.classList.remove('open');
                    answer.classList.add('hidden');
                } else {
                    item.classList.add('open');
                    answer.classList.remove('hidden');
                }
            });

            // Keyboard accessibility
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
    }

    // ========================================
    // Contact Form
    // ========================================
    function initContactForm() {
        const form = document.getElementById('contact-form');
        const successMessage = document.getElementById('form-success');

        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            const name = form.querySelector('#name');
            const phone = form.querySelector('#phone');
            const message = form.querySelector('#message');
            const privacy = form.querySelector('#privacy');

            let isValid = true;

            // Clear previous errors
            form.querySelectorAll('.error').forEach(function(el) {
                el.classList.remove('error');
            });

            // Validate required fields
            if (!name.value.trim()) {
                name.classList.add('error');
                isValid = false;
            }

            if (!phone.value.trim()) {
                phone.classList.add('error');
                isValid = false;
            }

            if (!message.value.trim()) {
                message.classList.add('error');
                isValid = false;
            }

            if (!privacy.checked) {
                privacy.classList.add('error');
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Šaljem...';

            // Simulate API call
            setTimeout(function() {
                form.classList.add('hidden');
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                }
            }, 1500);
        });
    }

    // ========================================
    // Cookie Consent
    // ========================================
    function initCookieConsent() {
        const cookieConsent = document.getElementById('cookie-consent');
        const acceptBtn = document.getElementById('accept-cookies');
        const declineBtn = document.getElementById('decline-cookies');

        if (!cookieConsent) return;

        // Check if user has already made a choice
        const cookieChoice = localStorage.getItem('vesodent-cookies');

        if (!cookieChoice) {
            // Show cookie consent after delay
            setTimeout(function() {
                cookieConsent.classList.remove('hidden');
            }, 2000);
        }

        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                localStorage.setItem('vesodent-cookies', 'accepted');
                cookieConsent.classList.add('hidden');
            });
        }

        if (declineBtn) {
            declineBtn.addEventListener('click', function() {
                localStorage.setItem('vesodent-cookies', 'declined');
                cookieConsent.classList.add('hidden');
            });
        }
    }

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Lazy Load Images (Native support fallback)
    // ========================================
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
            img.src = img.src;
        });
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    lazyObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function(img) {
            lazyObserver.observe(img);
        });
    }

    // ========================================
    // Performance: Reduce animations on low-end devices
    // ========================================
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', '0.01ms');
        document.documentElement.style.setProperty('--transition-normal', '0.01ms');
        document.documentElement.style.setProperty('--transition-slow', '0.01ms');
    }

})();
