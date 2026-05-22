// ============================================
// Smart Roku Remote - Main JavaScript
// ============================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log("Smart Roku Remote website loaded successfully");
    
    // Initialize all functionality
    initContactForm();
    initMobileMenu();
    initSmoothScroll();
});

// ============================================
// Contact Form Handler
// ============================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return; // Only initialize if contact form exists
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const statusElement = document.getElementById('form-status');
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showFormStatus('Please fill in all fields', 'error', statusElement);
            return;
        }
        
        // Validate email
        if (!isValidEmail(email)) {
            showFormStatus('Please enter a valid email address', 'error', statusElement);
            return;
        }
        
        // Since this is a static site, we'll show a success message
        // In production, you'd send this to an email service like Formspree or Emailjs
        showFormStatus('Thank you for your message! We will get back to you soon.', 'success', statusElement);
        
        // Reset form
        form.reset();
        
        // Log to console for demonstration
        console.log('Form submitted:', { name, email, subject, message });
        
        // You can integrate with services like:
        // - Formspree (https://formspree.io/)
        // - EmailJS (https://www.emailjs.com/)
        // - Netlify Forms (if hosted on Netlify)
    });
}

function showFormStatus(message, type, element) {
    if (!element) return;
    
    element.textContent = message;
    element.classList.remove('success', 'error');
    element.classList.add(type);
    
    // Scroll to status message
    element.scrollIntoView({ behavior: 'smooth' });
    
    // Clear after 5 seconds if success
    if (type === 'success') {
        setTimeout(() => {
            element.textContent = '';
            element.classList.remove('success', 'error');
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// Mobile Menu Toggle
// ============================================

function initMobileMenu() {
    // Add mobile menu toggle functionality if needed
    const header = document.querySelector('header');
    
    if (!header) return;
    
    // Handle small screen behavior
    if (window.innerWidth < 768) {
        // Optional: Add hamburger menu functionality here
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            // Show menu on larger screens
        }
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page reload
                window.history.pushState(null, null, href);
            }
        });
    });
}

// ============================================
// Analytics Events
// ============================================

// Track download button clicks
function trackDownloadClick() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'view_item', {
            items: [{
                id: 'app_download',
                name: 'Smart Roku Remote Download',
                category: 'app',
                quantity: 1
            }]
        });
    }
}

// Track FAQ interactions
function trackFAQView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'view_item', {
            items: [{
                id: 'faq_view',
                name: 'FAQ Viewed',
                category: 'engagement'
            }]
        });
    }
}

// Add download tracking to all download buttons
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('a[href*="play.google.com"]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', trackDownloadClick);
    });
});

// ============================================
// Performance Optimization
// ============================================

// Lazy load images (if using native lazy loading)
if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
    });
}

// ============================================
// Error Handling
// ============================================

window.addEventListener('error', function(event) {
    console.error('An error occurred:', event.error);
    // You can send errors to a monitoring service here
});

// ============================================
// Print console info
// ============================================

console.log('%c Smart Roku Remote', 'font-size: 16px; font-weight: bold; color: #FF3B30;');
console.log('%c Your Android remote control app for Roku TV', 'font-size: 12px; color: #666;');
console.log('Download: https://play.google.com/store/apps/details?id=com.smartrokuro');
