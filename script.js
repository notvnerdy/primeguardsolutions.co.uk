// ========================================
// MOBILE NAVIGATION TOGGLE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// CONTACT FORM VALIDATION & SUBMISSION
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous error messages
        clearErrorMessages();
        
        // Get form fields
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const service = document.getElementById('service');
        const message = document.getElementById('message');
        const privacy = document.getElementById('privacy');
        const formMessage = document.getElementById('formMessage');
        
        let isValid = true;
        
        // Validate required fields
        if (!fullName.value.trim()) {
            showFieldError('fullName', 'Full name is required');
            isValid = false;
        }
        
        if (!email.value.trim() || !isValidEmail(email.value)) {
            showFieldError('email', 'Valid email address is required');
            isValid = false;
        }
        
        if (phone.value.trim() && !isValidPhone(phone.value)) {
            showFieldError('phone', 'Valid phone number is required');
            isValid = false;
        }
        
        if (!service.value) {
            showFieldError('service', 'Please select a service');
            isValid = false;
        }
        
        if (!message.value.trim()) {
            showFieldError('message', 'Message is required');
            isValid = false;
        }
        
        if (!privacy.checked) {
            showFieldError('privacy', 'You must agree to the Privacy Policy');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            // Compile form data
            const formData = {
                fullName: fullName.value,
                email: email.value,
                phone: phone.value || 'Not provided',
                company: document.getElementById('company').value || 'Not provided',
                service: service.value,
                message: message.value,
                submittedAt: new Date().toISOString()
            };
            
            // Log to console for development
            console.log('Form Data:', formData);
            
            // Show success message
            formMessage.classList.remove('error');
            formMessage.classList.add('success');
            formMessage.textContent = 'Thank you for your message! We will respond to your enquiry as soon as possible.';
            formMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Remove success message after 8 seconds
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 8000);
        }
    });
}

// ========================================
// FORM VALIDATION HELPER FUNCTIONS
// ========================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
}

function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + '-error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

// ========================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ========================================
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentPath.includes(href) && href !== 'index.html') {
            link.classList.add('active');
        } else if ((currentPath === '/' || currentPath.endsWith('index.html')) && href === 'index.html') {
            link.classList.add('active');
        }
    });
}

// Update on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only handle if it's an internal section link
        if (href !== '#' && !href.includes('privacy') && !href.includes('terms')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// PERFORMANCE & ACCESSIBILITY
// ========================================
// Disable animations for users who prefer reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
}

// Add loading performance check
window.addEventListener('load', function() {
    // Page fully loaded
    document.body.classList.add('loaded');
});
