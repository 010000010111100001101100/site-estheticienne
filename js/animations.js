document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right, .fade-in-section');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (elementPosition.top < windowHeight * 0.85) {
                if (element.classList.contains('fade-in-section')) {
                    element.classList.add('is-visible');
                } else {
                    element.classList.add('visible');
                }
            }
        });
    };
    
    animateOnScroll();
    
    window.addEventListener('scroll', animateOnScroll);
    
    const addGlowEffect = function() {
        const headings = document.querySelectorAll('h1, h2');
        
        headings.forEach(heading => {
            heading.addEventListener('mouseenter', function() {
                this.style.textShadow = '0 0 10px rgba(229, 179, 187, 0.5), 0 0 20px rgba(229, 179, 187, 0.3)';
                this.style.transition = 'all 0.3s ease';
            });
            
            heading.addEventListener('mouseleave', function() {
                this.style.textShadow = '';
            });
        });
    };
    
    addGlowEffect();
    
    // Animation des bordures décoratives
    const decorativeBorders = document.querySelectorAll('.decorative-border');
    
    decorativeBorders.forEach(border => {
        border.addEventListener('mouseenter', function() {
            const corners = this.querySelectorAll('.corner-top-left, .corner-top-right, .corner-bottom-left, .corner-bottom-right');
            corners.forEach(corner => {
                corner.style.backgroundColor = 'var(--accent-color)';
                corner.style.opacity = '1';
                corner.style.transition = 'all 0.3s ease';
            });
        });
        
        border.addEventListener('mouseleave', function() {
            const corners = this.querySelectorAll('.corner-top-left, .corner-top-right, .corner-bottom-left, .corner-bottom-right');
            corners.forEach(corner => {
                corner.style.backgroundColor = 'var(--primary-color)';
                corner.style.opacity = '0.7';
            });
        });
    });
    
    // Ajout de la classe pour initialiser les animations
    document.body.classList.add('animations-enabled');
    
    // Modification du CSS pour les animations
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .animate-fade-up, .animate-fade-left, .animate-fade-right {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-fade-left {
            transform: translateX(-20px);
        }
        
        .animate-fade-right {
            transform: translateX(20px);
        }
        
        .animate-fade-up.visible, 
        .animate-fade-left.visible, 
        .animate-fade-right.visible {
            opacity: 1;
            transform: translate(0, 0);
        }
        
        .service-card {
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                        box-shadow 0.4s ease,
                        border-color 0.4s ease;
        }
    `;
    document.head.appendChild(styleSheet);
});
