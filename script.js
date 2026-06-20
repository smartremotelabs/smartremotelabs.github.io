// ============================================
// Roku TV Remote Control - Main JavaScript
// ============================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log("Roku TV Remote Control website loaded successfully");
    
    // Initialize all functionality
    initMobileMenu();
    initSmoothScroll();
    initStickyDownload();
});


// ============================================
// Mobile Menu Toggle
// ============================================

function initMobileMenu() {
    // Handled by the inline script in each HTML file to avoid double-binding conflicts.
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
// Sticky Download Bar Logic
// ============================================

function initStickyDownload() {
    const stickyBar = document.getElementById('stickyDownload');
    const heroSection = document.querySelector('.hero');
    
    if (!stickyBar || !heroSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Show bar when hero is scrolled past
            if (!entry.isIntersecting) {
                stickyBar.classList.add('visible');
            } else {
                stickyBar.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of hero is still visible

    observer.observe(heroSection);
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
                name: 'Roku TV Remote Control Download',
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

// Add event listeners to FAQ questions for tracking
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            trackFAQView();
        });
    });
});

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

console.log('%c Roku TV Remote Control', 'font-size: 16px; font-weight: bold; color: #FF3B30;');
console.log('%c Your Android remote control app for Roku TV', 'font-size: 12px; color: #666;');
console.log('Download: https://play.google.com/store/apps/details?id=com.smartremotelabs.smartremoteforroku');
