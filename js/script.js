/**
 * Beauté Élégance - Institut d'esthétique
 * Script principal pour les fonctionnalités interactives
 */

document.addEventListener('DOMContentLoaded', function() {
    // Variables
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

    // Fonction pour le menu fixe lors du défilement
    function stickyHeader() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    // Fonction pour le bouton "retour en haut"
    function scrollFunction() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    }

    // Fonction pour le menu mobile
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Animer les barres du menu hamburger
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    }

    // Fonction pour les onglets de tarifs
    function handleTabClick() {
        // Supprimer la classe active de tous les boutons et contenus
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Ajouter la classe active au bouton cliqué
        this.classList.add('active');
        
        // Afficher le contenu correspondant
        const target = this.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    }

    // Fonction pour le filtre de la galerie
    function handleFilterClick() {
        // Supprimer la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Ajouter la classe active au bouton cliqué
        this.classList.add('active');
        
        // Filtrer les éléments de la galerie
        const filter = this.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Fonction pour la soumission du formulaire de réservation
    function handleAppointmentSubmit(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const message = document.getElementById('message').value;
        
        // Validation simple
        if (!name || !email || !phone || !service || !date || !time) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Ici, vous pourriez envoyer les données à un serveur via AJAX
        // Pour l'exemple, nous affichons simplement une confirmation
        alert(`Merci ${name} ! Votre rendez-vous a été pris en compte. Nous vous contacterons prochainement pour confirmer.`);
        
        // Réinitialiser le formulaire
        this.reset();
    }

    // Fonction pour la soumission du formulaire de newsletter
    function handleNewsletterSubmit(e) {
        e.preventDefault();
        
        // Récupérer l'email
        const email = document.getElementById('newsletter-email').value;
        
        // Validation simple
        if (!email) {
            alert('Veuillez entrer votre adresse email.');
            return;
        }
        
        // Ici, vous pourriez envoyer les données à un serveur via AJAX
        // Pour l'exemple, nous affichons simplement une confirmation
        alert(`Merci ! Votre adresse ${email} a été ajoutée à notre newsletter.`);
        
        // Réinitialiser le formulaire
        this.reset();
    }

    // Fonction pour l'animation au défilement
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }

    // Fonction pour la galerie lightbox
    function initLightbox() {
        const galleryLinks = document.querySelectorAll('.gallery-zoom');
        
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
                
                // Fermer la lightbox au clic
                lightbox.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                });
            });
        });
    }

    // Fonction pour la section FAQ
    function handleFaqClick() {
        const faqItem = this.parentElement;
        
        // Vérifier si l'élément est déjà actif
        const isActive = faqItem.classList.contains('active');
        
        // Fermer tous les éléments FAQ
        faqItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Si l'élément n'était pas actif, l'ouvrir
        if (!isActive) {
            faqItem.classList.add('active');
        }
    }

    // Fonction pour l'animation des chiffres
    function animateNumbers() {
        const numberElements = document.querySelectorAll('.counter-number');
        
        numberElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000; // ms
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateNumber = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    element.textContent = target;
                }
            };
            
            updateNumber();
        });
    }

    // Fonction pour le slider de témoignages
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
        
        // Afficher le premier témoignage
        showTestimonial(currentIndex);
        
        // Changer de témoignage toutes les 5 secondes
        setInterval(nextTestimonial, 5000);
    }

    // Fonction pour l'animation au défilement des sections
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

    // Fonction pour le smooth scroll
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Fermer le menu mobile si ouvert
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Événements
    window.addEventListener('scroll', stickyHeader);
    window.addEventListener('scroll', scrollFunction);
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('scroll', animateSections);
    
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

    // Initialiser les fonctionnalités
    initLightbox();
    initSmoothScroll();
    initTestimonialsSlider();
    
    // Ajouter des classes d'animation aux sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-section');
    });
    
    // Ajouter des classes d'animation aux éléments
    const elementsToAnimate = document.querySelectorAll('.service-card, .price-item, .gallery-item, .team-member');
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // Ajouter des styles CSS pour les animations
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
        
        .animated {
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
