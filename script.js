// Language switching functionality
let currentLanguage = 'es'; // Changed default to Spanish

// Language switcher event listeners
document.addEventListener('DOMContentLoaded', function() {
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Language dropdown toggle
    langBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert(currentLanguage === 'en' ? 'Please fill in all fields.' : 'Por favor, completa todos los campos.');
                return;
            }
            
            // Show success message
            alert(currentLanguage === 'en' ? 'Thank you for your message! I\'ll get back to you soon.' : '¡Gracias por tu mensaje! Te responderé pronto.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Initialize language
    loadLanguage(currentLanguage);
});

// Language switching function
function switchLanguage(lang) {
    currentLanguage = lang;
    loadLanguage(lang);
    
    // Update language button
    const currentLangSpan = document.getElementById('current-lang');
    currentLangSpan.textContent = lang.toUpperCase();
    
    // Close dropdown
    const langDropdown = document.getElementById('lang-dropdown');
    langDropdown.classList.remove('active');
    
    // Update HTML lang attribute
    document.getElementById('html-root').setAttribute('lang', lang);
    
    // Store language preference
    localStorage.setItem('preferred-language', lang);
}

// Load language content
function loadLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-es]');
    
    elements.forEach(element => {
        const text = element.getAttribute('data-' + lang);
        if (text) {
            element.textContent = text;
        }
    });
}

// Load saved language preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
        switchLanguage(savedLang);
    } else {
        switchLanguage('es'); // Ensure Spanish is loaded if no preference
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.topic-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation for topic cards
document.addEventListener('DOMContentLoaded', function() {
    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
