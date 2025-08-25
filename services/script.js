// NAVBAR
document.addEventListener('DOMContentLoaded', function() {

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('nav .container');
    const navbar = document.querySelector('nav');
  
    // Mobile menu functionality
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
  
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navContainer.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
  
        // Close menu when clicking on a nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }
  
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
                
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
  
    // Navbar scroll effect
    let prevScrollPos = window.pageYOffset;
    window.addEventListener('scroll', function() {
        // Add/remove scrolled class based on scroll position
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        const currentScrollPos = window.pageYOffset;
        if (prevScrollPos > currentScrollPos) {
            navbar.style.top = '0';
        } else {
            navbar.style.top = '-100px';
        }
        prevScrollPos = currentScrollPos;
    });

    // Initialize GSAP animations if screen is wide enough
    if (window.innerWidth > 768) {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            gsap.to(".panels", {
                xPercent: -200,
                ease: "none",
                scrollTrigger: {
                    trigger: ".services",
                    pin: true,
                    scrub: true,
                    end: "+=3000",
                }
            });
        }
    } else {
        // For mobile, add touch event listeners for swiping
        const panels = document.querySelector('.panels');
        if (panels) {
            let touchStartX = 0;
            let touchEndX = 0;
            let currentPanel = 0;
            const totalPanels = document.querySelectorAll('.panel').length;

            function goToPanel(index) {
                if (index < 0) index = 0;
                if (index >= totalPanels) index = totalPanels - 1;
                
                currentPanel = index;
                panels.style.transform = `translateX(-${currentPanel * 100}%)`;
            }

            panels.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, false);

            panels.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);

            function handleSwipe() {
                const swipeThreshold = 50;
                const difference = touchStartX - touchEndX;

                if (Math.abs(difference) > swipeThreshold) {
                    if (difference > 0) {
                        goToPanel(currentPanel + 1);
                    } else {
                        goToPanel(currentPanel - 1);
                    }
                }
            }

            // Initialize panels for mobile
            panels.style.display = 'flex';
            panels.style.transition = 'transform 0.3s ease';
        }
    }

    // Testimonials functionality
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        testimonials[0].classList.add('active');

        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            currentTestimonial = (index + testimonials.length) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }

        function nextTestimonial() {
            showTestimonial(currentTestimonial + 1);
        }

        // Auto-rotate testimonials
        setInterval(nextTestimonial, 5000);

        // Add navigation buttons if they exist
        const prevBtn = document.querySelector('.testimonial-nav.prev');
        const nextBtn = document.querySelector('.testimonial-nav.next');

        if (prevBtn) prevBtn.addEventListener('click', () => showTestimonial(currentTestimonial - 1));
        if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    }
});