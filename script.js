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
        
        // If form is valid, submit via Formspree
        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Prepare form data
            const formData = new FormData();
            formData.append('fullName', fullName.value);
            formData.append('email', email.value);
            formData.append('phone', phone.value || 'Not provided');
            formData.append('company', document.getElementById('company').value || 'Not provided');
            formData.append('service', service.value);
            formData.append('message', message.value);
            formData.append('_subject', 'New Security Enquiry from Prime Guard Solutions');
            
            // Submit to Formspree (replace with your Formspree endpoint)
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    formMessage.classList.remove('error');
                    formMessage.classList.add('success');
                    formMessage.textContent = 'Thank you for your message! We will respond to your enquiry within 15 minutes during business hours.';
                    formMessage.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Scroll to message
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Remove success message after 10 seconds
                    setTimeout(function() {
                        formMessage.style.display = 'none';
                    }, 10000);
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                // Show error message
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                formMessage.textContent = 'Sorry, there was an error sending your message. Please call us at +44 7853 580555 or email info@primeguardsolutions.co.uk';
                formMessage.style.display = 'block';
                console.error('Form submission error:', error);
            })
            .finally(() => {
                // Restore button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
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

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================
if (window.matchMedia('(min-width: 768px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const hero = document.querySelector('.hero');
                if (hero) {
                    const scrolled = window.pageYOffset;
                    const limit = hero.offsetHeight;
                    
                    if (scrolled <= limit) {
                        // Parallax effect via CSS custom property
                        hero.style.setProperty('--parallax-offset', scrolled * 0.5 + 'px');
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ========================================
// INLINE FORM VALIDATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const validatableInputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea, select');
    
    validatableInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('valid') || this.classList.contains('invalid')) {
                validateInput(this);
            }
        });
    });
});

function validateInput(input) {
    const value = input.value.trim();
    
    if (!input.hasAttribute('required') && !value) {
        input.classList.remove('valid', 'invalid');
        return;
    }
    
    let isValid = false;
    
    if (input.type === 'email') {
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (input.type === 'tel') {
        isValid = /^[0-9\s\-\+\(\)]+$/.test(value) && value.length >= 10;
    } else if (input.tagName === 'SELECT') {
        isValid = value !== '';
    } else {
        isValid = value.length > 0;
    }
    
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else if (value) {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
}
// Enhanced form validation with visual feedback
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Add validation icons to inputs
    const validatableInputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea, select');
    
    validatableInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('valid') || this.classList.contains('invalid')) {
                validateInput(this);
            }
        });
    });
});

function validateInput(input) {
    const value = input.value.trim();
    
    // Skip valid// Enhanced form validation with visual feedback
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Add  document.addEventListener('DOMContentLoaded', f /    const form = document./.test(value);
    } else if (inp    if (!form) return;

    // Add validation icons to ]+
    // Add validatioue.    const validatableInputs = form.qag    
    validatableInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);

              input.addEventListener('blur',               validateInput(this);
        });
     al        });
        
        inem        
 ')          input.classList.add('invalid');
    }
}
