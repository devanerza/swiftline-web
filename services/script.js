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