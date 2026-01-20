// ============================================
// THOMAS BURGALAT - PORTFOLIO
// JavaScript sobre et performant
// ============================================

(function() {
    'use strict';

    // === NAVIGATION ===
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    let lastScrollY = 0;
    let ticking = false;

    // Handle scroll - hide/show header
    function updateHeader() {
        const scrollY = window.scrollY;
        
        if (scrollY > lastScrollY && scrollY > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // === SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === SCROLL ANIMATIONS ===
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Initialize animations
    function initAnimations() {
        const animatedElements = document.querySelectorAll(
            '.section-header, .about-card, .project-card, .skill-category, .contact-wrapper > *'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
            observer.observe(el);
        });
    }

    // === STATS COUNTER ANIMATION ===
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    
                    // Check if it's a number
                    if (!isNaN(parseInt(finalValue))) {
                        const endValue = parseInt(finalValue);
                        let startValue = 0;
                        const duration = 1500;
                        const increment = endValue / (duration / 16);
                        
                        const counter = setInterval(() => {
                            startValue += increment;
                            if (startValue >= endValue) {
                                target.textContent = finalValue;
                                clearInterval(counter);
                            } else {
                                target.textContent = Math.floor(startValue) + '+';
                            }
                        }, 16);
                    }
                    
                    statsObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => statsObserver.observe(stat));
    }

    // === ACTIVE NAV LINK ===
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (navLink && !(navLink.classList.contains('nav-cta'))) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
                        link.style.color = '';
                    });
                    navLink.style.color = 'var(--color-primary)';
                }
            }
        });
    }

    window.addEventListener('scroll', function() {
        requestAnimationFrame(updateActiveNavLink);
    }, { passive: true });

    // === INIT ===
    document.addEventListener('DOMContentLoaded', function() {
        initAnimations();
        animateStats();
        updateActiveNavLink();
        initTypewriter();
    });

    // === TYPEWRITER EFFECT ===
    function initTypewriter() {
        const typewriterEl = document.getElementById('typewriter');
        if (typewriterEl && typeof Typewriter !== 'undefined') {
            new Typewriter(typewriterEl, {
                strings: [
                    'a Software Developer.',
                    'a Second-Year IT Student.',
                    'Creative & Passionate.',
                    'looking for an internship.'
                ],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50
            });
        }
    }

})();
