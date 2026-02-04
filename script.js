// ========== Mobile Menu Toggle ==========
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ========== Navbar Scroll Effect ==========
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========== Active Navigation Link on Scroll ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ========== Smooth Scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 72;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Contact Form Handling ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.querySelector('span').innerHTML;
        
        // Get current language for messages
        const currentLang = localStorage.getItem('language') || 'ar';
        const messages = {
            ar: {
                sending: 'جاري الإرسال......',
                sending: 'جاري الإرسال...',
        success: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
        error: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.'
                                },
            en: {
                sending: 'Sending...',
                success: 'Your message has been sent successfully! We will contact you soon.',
                error: 'An error occurred while sending the message. Please try again.'
            },
            fr: {
                sending: 'Envoi en cours...',
                success: 'Votre message a Ã©tÃ© envoyÃ© avec succÃ¨s! Nous vous contacterons bientÃ´t.',
                error: 'Une erreur s\'est produite lors de l\'envoi du message. Veuillez rÃ©essayer.'
            }
        };
        
        submitButton.querySelector('span').innerHTML = messages[currentLang].sending;
        submitButton.disabled = true;
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showNotification(messages[currentLang].success, 'success');
            contactForm.reset();
            
        } catch (error) {
            showNotification(messages[currentLang].error, 'error');
        } finally {
            submitButton.querySelector('span').innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// ========== Notification System ==========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 24px;
        background: ${type === 'success' ? '#22C55E' : type === 'error' ? '#EF4444' : '#161b2e'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        font-family: 'Tajawal', sans-serif;
        font-size: 15px;
        font-weight: 500;
        direction: rtl;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== Scroll Animations ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation (excluding stat-item to avoid zoom effect)
document.querySelectorAll('.about-card, .service-card, .portfolio-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== SIMPLE COUNTER ANIMATION - THIS WILL WORK! ==========
console.log('ðŸš€ Counter script loaded!');

// Wait for page to load
window.addEventListener('load', function() {
    console.log('âœ… Page loaded, starting counter setup...');
    
    // Find all stat items
    const statItems = document.querySelectorAll('.stat-item');
    console.log(`ðŸ“Š Found ${statItems.length} stat items`);
    
    // Function to animate a single number
    function animateNumber(element) {
        const text = element.textContent;
        console.log(`ðŸ”¢ Animating: ${text}`);
        
        // Check for special characters
        const hasPlus = text.includes('+');
        const hasSlash = text.includes('/');
        
        // Get the number
        const number = parseInt(text.replace(/\D/g, ''));
        
        // If it's 24/7, just show it
        if (hasSlash) {
            console.log('â° Found 24/7, showing directly');
            return;
        }
        
        // Start counting
        if (number) {
            console.log(`âš¡ Starting count from 0 to ${number}`);
            let current = 0;
            const duration = 2000; // 2 seconds
            const steps = 100;
            const increment = number / steps;
            const stepTime = duration / steps;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= number) {
                    element.textContent = number + (hasPlus ? '+' : '');
                    clearInterval(counter);
                    console.log(`âœ… Finished counting: ${number}${hasPlus ? '+' : ''}`);
                } else {
                    element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                }
            }, stepTime);
        }
    }
    
    // Create intersection observer to trigger when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                console.log('ðŸ‘€ Stats section is visible!');
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    animateNumber(statNumber);
                    entry.target.dataset.animated = 'true';
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });
    
    // Observe each stat item
    statItems.forEach(item => {
        statsObserver.observe(item);
    });
    
    console.log('ðŸ‘ï¸ Observer set up, waiting for scroll...');
});

// ========== Form Validation ==========
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateInput(this);
    });
});

function validateInput(input) {
    const value = input.value.trim();
    
    if (input.hasAttribute('required') && !value) {
        input.style.borderColor = '#EF4444';
        return false;
    }
    
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            input.style.borderColor = '#EF4444';
            return false;
        }
    }
    
    input.style.borderColor = '#E5E5E5';
    return true;
}

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('âœ… BinnaX Website Loaded');
    updateActiveNavLink();
});

// ========== Console Welcome Message ==========
console.log('%cðŸš€ Welcome to BinnaX! ', 'background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); color: white; font-size: 20px; padding: 10px 20px; border-radius: 8px;');
console.log('%cBuild Your Digital Future ðŸ’»', 'color: #6366F1; font-size: 16px; font-weight: bold;');
console.log('%cContact: binnaxdev@gmail.com', 'color: #525252; font-size: 14px;');