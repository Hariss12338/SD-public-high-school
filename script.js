/* 
    S.D. Public High School - Interactivity Script
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between hamburger and X if needed
    });

    // 2. Sticky Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.padding = '1.25rem 0';
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });

    // 3. Form Submission Handling
    const inquiryForm = document.getElementById('inquiryForm');
    const successModal = document.getElementById('successModal');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Form Data
            const studentName = document.getElementById('studentName').value;
            const parentName = document.getElementById('parentName').value;
            const phone = document.getElementById('phone').value;
            const grade = document.getElementById('grade').value;
            const address = document.getElementById('address').value;

            // Basic Validation Check
            if (studentName.length < 3) {
                alert('Please enter a valid student name.');
                return;
            }

            if (!/^\d{10}$/.test(phone)) {
                alert('Please enter a valid 10-digit phone number.');
                return;
            }

            // Construct WhatsApp Message
            const message = `Hi, I am inquiring about admissions for S.D. Public High School.
*Student Name:* ${studentName}
*Parent Name:* ${parentName}
*Phone:* ${phone}
*Grade:* ${grade}
*Address:* ${address}`;

            const whatsappUrl = `https://wa.me/917304246024?text=${encodeURIComponent(message)}`;

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');

            // Show success feedback if a modal exists
            if (successModal) {
                successModal.style.display = 'block';
            }
            inquiryForm.reset();
        });
    }

    // 4. Enhanced Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once shown
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 5. Parallax Effect for Hero
    const hero = document.querySelector('.hero');

    if (window.gsap) {
        gsap.from('.hero-content', { duration: 1.2, y: 40, opacity: 0, ease: 'power3.out', delay: 0.2 });
    }

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });

    // 6. Dynamic Background Transitions
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                // Subtle hue rotation or brightness shift on scroll could go here
                // For now, we'll keep it to the clean CSS animations
            }
        });
    });

    // Add classes for animations
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .card, .facility-item, .gallery-item');
    animatedElements.forEach((el, index) => {
        el.style.transitionDelay = `${(index % 3) * 0.1}s`; // Stagger effect
        observer.observe(el);
    });
});
