// Script pour gérer les témoignages clients
document.addEventListener('DOMContentLoaded', function() {
    // Gestion des onglets de témoignages
    const testimonialsTabs = document.querySelectorAll('.testimonials-tabs .tab-btn');
    const testimonialsContents = document.querySelectorAll('.testimonials-tab-content');
    
    // Fonction pour activer un onglet
    function activateTestimonialTab(tabId) {
        // Désactiver tous les onglets
        testimonialsTabs.forEach(tab => tab.classList.remove('active'));
        testimonialsContents.forEach(content => content.classList.remove('active'));
        
        // Activer l'onglet sélectionné
        const selectedTab = document.querySelector(`.testimonials-tabs .tab-btn[data-tab="${tabId}"]`);
        const selectedContent = document.getElementById(tabId);
        
        if (selectedTab && selectedContent) {
            selectedTab.classList.add('active');
            selectedContent.classList.add('active');
        }
    }
    
    // Écouter les clics sur les onglets
    testimonialsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            activateTestimonialTab(tabId);
        });
    });
    
    // Gestion du formulaire de témoignage
    const testimonialForm = document.getElementById('testimonial-form');
    const successMessage = document.getElementById('testimonial-success');
    
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('testimonial-name').value;
            const email = document.getElementById('testimonial-email').value;
            const rating = document.querySelector('input[name="rating"]:checked').value;
            const service = document.getElementById('testimonial-service').value;
            const message = document.getElementById('testimonial-message').value;
            const consent = document.getElementById('testimonial-consent').checked;
            
            // Validation simple
            if (!name || !email || !service || !message || !consent) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Dans un environnement réel, vous enverriez ces données à un serveur
            // Ici, nous simulons simplement une soumission réussie
            
            // Afficher le message de succès
            testimonialForm.reset();
            successMessage.style.display = 'block';
            
            // Faire défiler jusqu'au message de succès
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Masquer le message après 5 secondes
            setTimeout(() => {
                successMessage.style.display = 'none';
                // Revenir à l'onglet des témoignages
                activateTestimonialTab('tab-all');
            }, 5000);
        });
    }
    
    // Gestion de l'upload de photo
    const photoInput = document.getElementById('testimonial-photo');
    if (photoInput) {
        photoInput.addEventListener('change', function() {
            // Vérifier la taille du fichier (max 2MB)
            if (this.files[0] && this.files[0].size > 2 * 1024 * 1024) {
                alert('La taille du fichier ne doit pas dépasser 2MB.');
                this.value = ''; // Réinitialiser l'input
            }
            
            // Vérifier le type de fichier
            const fileType = this.files[0] ? this.files[0].type : '';
            if (fileType && !fileType.startsWith('image/')) {
                alert('Veuillez sélectionner une image (JPG, PNG).');
                this.value = ''; // Réinitialiser l'input
            }
        });
    }
});
