document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');

    function highlightActiveMenu() {
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkPath = new URL(link.getAttribute('href'), window.location.origin).pathname;
            
            link.classList.remove('active');
            
            if (currentPage === linkPath) {
                link.classList.add('active');
                
                const dropdown = link.closest('.has-dropdown');
                if (dropdown) {
                    dropdown.classList.add('active');
                }
            }
        });
    }

    highlightActiveMenu();
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }
    
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    const dropdownLinks = document.querySelectorAll('.has-dropdown > a');
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    let touchStartY = 0;
    let touchEndY = 0;
    
    function closeAllDropdowns() {
        dropdownLinks.forEach(link => {
            link.parentNode.classList.remove('active');
            link.parentNode.classList.remove('dropdown-active');
        });
    }
    
    let dropdownTimeout;
    
    dropdownLinks.forEach(link => {
        const parent = link.parentNode;
        const dropdownMenu = parent.querySelector('.dropdown-menu');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                
                dropdownLinks.forEach(otherLink => {
                    if (otherLink !== link && otherLink.parentNode.classList.contains('dropdown-active')) {
                        otherLink.parentNode.classList.remove('dropdown-active');
                    }
                });
                
                if (parent.classList.contains('dropdown-active')) {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.transform = 'translateX(-50%) translateY(10px)';
                    setTimeout(() => {
                        parent.classList.remove('dropdown-active');
                    }, 300);
                } else {
                    parent.classList.add('dropdown-active');
                }
            } else {
                if (this.getAttribute('href') === '#' || this.getAttribute('href') === '') {
                    e.preventDefault();
                }
            }
        });
        
        if (window.innerWidth >= 992) {
            parent.addEventListener('mouseenter', function() {
                clearTimeout(dropdownTimeout);
                closeAllDropdowns();
                this.classList.add('active');
            });
            
            parent.addEventListener('mouseleave', function() {
                dropdownTimeout = setTimeout(() => {
                    this.classList.remove('active');
                }, 200);
            });
            
            if (dropdownMenu) {
                dropdownMenu.addEventListener('mouseenter', function() {
                    clearTimeout(dropdownTimeout);
                });
                
                dropdownMenu.addEventListener('mouseleave', function() {
                    dropdownTimeout = setTimeout(() => {
                        parent.classList.remove('active');
                    }, 200);
                });
            }
        }
        
        if (window.innerWidth < 992 && dropdownMenu) {
            dropdownMenu.addEventListener('touchstart', function(e) {
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });
            
            dropdownMenu.addEventListener('touchend', function(e) {
                touchEndY = e.changedTouches[0].screenY;
                if (touchEndY - touchStartY > 50) {
                    parent.classList.remove('dropdown-active');
                }
            }, { passive: true });
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-dropdown')) {
            closeAllDropdowns();
        }
    });
    
    function setActiveNavItem() {
        const currentLocation = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-links > li > a');
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            
            item.classList.remove('active');
            if (item.parentNode.classList.contains('has-dropdown')) {
                item.parentNode.classList.remove('active');
            }
            
            // Vérifier si le lien correspond à la page actuelle
            if (href && currentLocation.includes(href) && href !== 'index.html' && href !== '#') {
                item.classList.add('active');
                
                // Si c'est dans un dropdown, activer le parent aussi
                if (item.parentNode.classList.contains('has-dropdown')) {
                    item.parentNode.classList.add('active');
                }
            } else if (currentLocation.endsWith('/') || currentLocation.endsWith('index.html')) {
                if (href === 'index.html' || href === './') {
                    item.classList.add('active');
                }
            }
        });
        
        // Vérifier aussi les liens dans les menus déroulants
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentLocation.includes(href)) {
                link.classList.add('active');
                
                // Activer aussi le menu parent
                const parentDropdown = link.closest('.has-dropdown');
                if (parentDropdown) {
                    const parentLink = parentDropdown.querySelector('> a');
                    parentLink.classList.add('active');
                    parentDropdown.classList.add('active');
                }
            }
        });
    }
    
    // Appliquer la fonction au chargement
    setActiveNavItem();
    
    // Gestion de la navigation entre les pages et les sections
    const menuLinks = document.querySelectorAll('.nav-links a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si c'est un lien vers une ancre dans la page actuelle
            if (href.includes('#') && !href.startsWith('http')) {
                const isExternalPage = href.indexOf('/') !== -1;
                
                // Si le lien pointe vers une autre page avec une ancre
                if (isExternalPage) {
                    // Laisser le comportement par défaut, mais stocker l'ancre dans sessionStorage
                    const anchor = href.split('#')[1];
                    if (anchor) {
                        sessionStorage.setItem('targetAnchor', anchor);
                    }
                } else {
                    // Si c'est une ancre dans la page actuelle
                    e.preventDefault();
                    const targetId = href.split('#')[1];
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        // Fermer tous les sous-menus
                        document.querySelectorAll('.dropdown-active').forEach(item => {
                            item.classList.remove('dropdown-active');
                        });
                        
                        // Fermer le menu mobile si ouvert
                        if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
                            mobileMenuToggle.classList.remove('active');
                            navLinks.classList.remove('active');
                            body.classList.remove('menu-open');
                        }
                        
                        // Scroll vers la section
                        window.scrollTo({
                            top: targetSection.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
    
    // Vérifier s'il y a une ancre cible stockée dans sessionStorage
    window.addEventListener('DOMContentLoaded', function() {
        const targetAnchor = sessionStorage.getItem('targetAnchor');
        
        if (targetAnchor) {
            // Effacer l'ancre stockée
            sessionStorage.removeItem('targetAnchor');
            
            // Attendre un peu pour que la page soit complètement chargée
            setTimeout(() => {
                const targetSection = document.getElementById(targetAnchor);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }, 500);
        }
    });
    
    // Animation pour la galerie
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Animation pour les questions fréquentes
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle i');
            
            // Fermer toutes les autres réponses
            document.querySelectorAll('.faq-answer').forEach(item => {
                if (item !== answer && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.style.maxHeight = '0';
                    item.previousElementSibling.querySelector('.faq-toggle i').classList.remove('fa-minus');
                    item.previousElementSibling.querySelector('.faq-toggle i').classList.add('fa-plus');
                }
            });
            
            // Ouvrir/fermer la réponse actuelle
            answer.classList.toggle('active');
            
            if (answer.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.classList.remove('fa-plus');
                toggle.classList.add('fa-minus');
            } else {
                answer.style.maxHeight = '0';
                toggle.classList.remove('fa-minus');
                toggle.classList.add('fa-plus');
            }
        });
    });
    
    // Gestion des onglets des tarifs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tarifDropdownLinks = document.querySelectorAll('.dropdown-menu a[href*="#tab-"]');

    // Gestion des onglets
    function activateTab(tabId) {
        // Désactiver tous les onglets
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Activer l'onglet correspondant
        const targetBtn = document.querySelector(`[data-tab="${tabId}"]`);
        if (targetBtn) {
            targetBtn.classList.add('active');
            const targetContent = document.querySelector(`#${tabId}`);
            if (targetContent) {
                targetContent.classList.add('active');
                // Scroller vers le contenu avec un décalage pour éviter que le header fixe ne cache le contenu
                window.scrollTo({
                    top: targetContent.offsetTop - 120,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Gestion des clics sur les boutons d'onglets
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            activateTab(targetTab);
        });
    });

    // Gestion des clics sur les liens du menu déroulant
    tarifDropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const targetTab = href.split('#')[1];
            
            // Vérifier si nous sommes déjà sur la page des tarifs
            if (window.location.pathname.includes('/tarifs/')) {
                // Si oui, activer l'onglet correspondant
                activateTab(targetTab);
            } else {
                // Sinon, stocker l'onglet cible dans sessionStorage et rediriger
                sessionStorage.setItem('targetTab', targetTab);
                window.location.href = href;
            }
        });
    });
    
    // Gestion des onglets et des ancres dans l'URL
    function handleTabsFromURL() {
        // Vérifier d'abord s'il y a un onglet cible stocké dans sessionStorage
        const storedTab = sessionStorage.getItem('targetTab');
        if (storedTab) {
            // Effacer l'onglet cible stocké
            sessionStorage.removeItem('targetTab');
            activateTab(storedTab);
            return; // Sortir de la fonction si un onglet a été activé depuis sessionStorage
        }
        
        // Ensuite, vérifier si l'URL contient un identifiant d'onglet
        if (window.location.hash) {
            const hash = window.location.hash.substring(1); // Enlever le # du début
            if (hash.startsWith('tab-')) {
                // S'assurer que l'onglet existe avant de l'activer
                const tabExists = document.getElementById(hash);
                if (tabExists) {
                    activateTab(hash);
                }
            }
        }
    }
    
    // Attendre que la page soit complètement chargée avant d'activer les onglets
    setTimeout(handleTabsFromURL, 300);

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');

            // Cacher tous les contenus
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Afficher le contenu correspondant
            const targetId = this.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Bouton retour en haut
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
