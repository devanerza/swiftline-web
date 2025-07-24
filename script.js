// NAVBAR
document.addEventListener('DOMContentLoaded', function() {

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('nav .container');
  
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
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('nav');
        // console.log('Scroll Y:', window.scrollY); // Debug log
        if (window.scrollY > 50) {
            // console.log('Adding scrolled class'); // Debug log
            navbar.classList.add('scrolled');
        } else {
            // console.log('Removing scrolled class'); // Debug log
            navbar.classList.remove('scrolled');
        }
        // console.log('Navbar classes:', navbar.className); // Debug log
    });

    // Navbar scroll new
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.querySelector(".navbar").style.top = "0";
        } else {
            document.querySelector(".navbar").style.top = "-100px";
        }
        prevScrollpos = currentScrollPos;
    }
});



// STATS COUNTING ANIMATION
const stats = document.querySelectorAll('.stat-number');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            stats.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 160;
                
                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        // Use toFixed(0) for whole numbers, toFixed(1) for decimal
                        stat.textContent = (target === 99.9) ? current.toFixed(1) : Math.floor(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        // Final display - use toFixed(0) for whole numbers, toFixed(1) for decimal
                        stat.textContent = (target === 99.9) ? target.toFixed(1) : Math.floor(target);
                        
                        // Add percentage or plus sign based on the target value
                        // if (target === 99.9) {
                        //     stat.textContent += '%';
                        // } else if (target === 200) {
                        //     stat.textContent += '+';
                        // } else if (target === 40) {
                        //     stat.textContent += '%';
                        // }
                    }
                };
                
                updateCount();
            });
            
            // Disconnect observer after animation
            observer.disconnect();
        }
    });
}, {
    threshold: 0.5
});

// Observe each stat number
stats.forEach(stat => observer.observe(stat)); 



// SERVICES
const gridItemOverlay = document.querySelectorAll('.overlay');
const previewContent = document.querySelectorAll('.preview-content');
const cta = document.querySelectorAll('.cta');

gridItemOverlay.forEach((overlay, index) => {
    overlay.addEventListener('mouseover', () => {
        previewContent[index].classList.add('not-active');
        cta[index].classList.add('active');
    });
    overlay.addEventListener('mouseout', () => {
        previewContent[index].classList.remove('not-active');
        cta[index].classList.remove('active');
    });
});




// TESTIMONIAL
let testimonials = document.querySelectorAll('.testimonial');
let current = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) {
            testimonial.classList.add('active');
        }
    });
}

function nextTestimonial() {
    current = (current + 1) % testimonials.length;
    showTestimonial(current);
}

function prevTestimonial() {
    current = (current - 1 + testimonials.length) % testimonials.length;
    showTestimonial(current);
}

// Optional Auto-slide
setInterval(nextTestimonial, 5000);
