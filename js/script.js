document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const backToTopBtn = document.querySelector('.back-to-top');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const appointmentForm = document.getElementById('appointment-form');
    const newsletterForm = document.getElementById('newsletter-form');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const dropdownMenus = document.querySelectorAll('.has-dropdown');
    const dropdownLinks = document.querySelectorAll('.has-dropdown > a');

    function handleDropdowns() {
        dropdownMenus.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                if (window.innerWidth > 992) {
                    this.classList.add('active');
                }
            });
            
            dropdown.addEventListener('mouseleave', function() {
                if (window.innerWidth > 992) {
                    this.classList.remove('active');
                }
            });
        });
        
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    
                    dropdownMenus.forEach(item => {
                        if (item !== parent) {
                            item.classList.remove('active');
                        }
                    });
                    
                    parent.classList.toggle('active');
                }
            });
        });
    }
    
    function handlePageNavigation() {
        const storedAnchor = sessionStorage.getItem('targetAnchor');
        if (storedAnchor) {
            sessionStorage.removeItem('targetAnchor');
            
            setTimeout(() => {
                const targetElement = document.querySelector(storedAnchor);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        }
        
        const externalLinks = document.querySelectorAll('a[href*=".html#"]');
        externalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const hashIndex = href.indexOf('#');
                
                if (hashIndex !== -1) {
                    const anchor = href.substring(hashIndex);
                    sessionStorage.setItem('targetAnchor', anchor);
                }
            });
        });
    }
    
    function stickyHeader() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    function scrollFunction() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    }

    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    }

    function handleTabClick() {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        this.classList.add('active');
        
        const target = this.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    }

    function handleFilterClick() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function handleAppointmentSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        const errors = [];
        
        const requiredFields = ['name', 'email', 'phone', 'service', 'date', 'time'];
        requiredFields.forEach(field => {
            if (!formData.get(field)) {
                errors.push(`Le champ ${field} est requis`);
            }
        });
        
        const email = formData.get('email');
        const phone = formData.get('phone');
        if (phone && !/^[0-9]{10}$/.test(phone)) {
            errors.push('Veuillez entrer un numéro de téléphone valide (10 chiffres)');
        }
        
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }
        
        alert(`Merci ${formData.get('name')} ! Votre rendez-vous a été pris en compte. Nous vous contacterons prochainement pour confirmer.`);
        form.reset();
    }

    function handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        const email = formData.get('email');
        if (!email) {
            alert('Veuillez entrer votre adresse email.');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Veuillez entrer une adresse email valide');
            return;
        }
        
        alert(`Merci ! Votre adresse ${email} a été ajoutée à notre newsletter.`);
        form.reset();
    }

    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }

    function setupLightbox() {
        const galleryLinks = document.querySelectorAll('.gallery-item a');
        
        galleryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const imgSrc = this.getAttribute('href');
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <img src="${imgSrc}" alt="Image agrandie">
                        <span class="lightbox-close">&times;</span>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                lightbox.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                });
            });
        });
    }

    function handleFaqClick() {
        const faqItem = this.parentElement;
        
        const isActive = faqItem.classList.contains('active');
        
        faqItems.forEach(item => {
            item.classList.remove('active');
        });
        
        if (!isActive) {
            faqItem.classList.add('active');
        }
    }

    function animateNumbers() {
        const numberElements = document.querySelectorAll('.counter-number');
        
        numberElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateNumber = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.round(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    element.textContent = target;
                }
            };
            
            updateNumber();
        });
    }

    function initTestimonialsSlider() {
        const testimonials = document.querySelectorAll('.testimonial-item');
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }
        
        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }
        
        showTestimonial(currentIndex);
        
        setInterval(nextTestimonial, 5000);
    }

    function animateSections() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('section-visible');
            }
        });
    }

    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"], .scroll-down');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                let targetId = this.getAttribute('href');
                
                if (this.classList.contains('scroll-down')) {
                    const currentSection = this.closest('section');
                    const nextSection = currentSection.nextElementSibling;
                    if (nextSection) {
                        targetId = `#${nextSection.id}`;
                    }
                }
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                    
                    const offset = this.classList.contains('scroll-down') ? 50 : 100;
                    window.scrollTo({
                        top: targetElement.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    const handleScroll = () => {
        stickyHeader();
        scrollFunction();
        animateOnScroll();
        animateSections();
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    initSmoothScroll();
    handleDropdowns();
    handlePageNavigation();
    
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', handleTabClick);
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', handleFaqClick);
    });
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmit);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    setupLightbox();
    initSmoothScroll();
    initTestimonialsSlider();
    handleDropdowns();
    handlePageNavigation();
    
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-section');
    });
    
    const elementsToAnimate = document.querySelectorAll('.service-card, .price-item, .gallery-item, .team-member');
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .animate-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .section-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 90vh;
            display: block;
            margin: 0 auto;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
        }
        
        header.sticky {
            padding: 5px 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-menu-toggle span.active:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle span.active:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle span.active:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        body.menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(styleElement);

    // Appeler les fonctions d'animation initiales
    animateOnScroll();
    animateSections();
});
