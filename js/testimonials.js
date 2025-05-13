document.addEventListener('DOMContentLoaded', function() {
    const testimonialsTabs = document.querySelectorAll('.testimonials-tabs .tab-btn');
    const testimonialsContents = document.querySelectorAll('.testimonials-tab-content');
    
    function activateTestimonialTab(tabId) {
        testimonialsTabs.forEach(tab => tab.classList.remove('active'));
        testimonialsContents.forEach(content => content.classList.remove('active'));
        
        const selectedTab = document.querySelector(`.testimonials-tabs .tab-btn[data-tab="${tabId}"]`);
        const selectedContent = document.getElementById(tabId);
        
        if (selectedTab && selectedContent) {
            selectedTab.classList.add('active');
            selectedContent.classList.add('active');
        }
    }
    
    testimonialsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            activateTestimonialTab(tabId);
        });
    });
    
    const testimonialForm = document.getElementById('testimonial-form');
    const successMessage = document.getElementById('testimonial-success');
    
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('testimonial-name').value;
            const email = document.getElementById('testimonial-email').value;
            const rating = document.querySelector('input[name="rating"]:checked').value;
            const service = document.getElementById('testimonial-service').value;
            const message = document.getElementById('testimonial-message').value;
            const consent = document.getElementById('testimonial-consent').checked;
            
            if (!name || !email || !service || !message || !consent) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Dans un environnement réel, vous enverriez ces données à un serveur
            // Ici, nous simulons simplement une soumission réussie
            
            // Afficher le message de succès
            testimonialForm.reset();
            successMessage.style.display = 'block';
            
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setTimeout(() => {
                successMessage.style.display = 'none';
                activateTestimonialTab('tab-all');
            }, 5000);
        });
    }
    
    const photoInput = document.getElementById('testimonial-photo');
    if (photoInput) {
        photoInput.addEventListener('change', function() {
            if (this.files[0] && this.files[0].size > 2 * 1024 * 1024) {
                alert('La taille du fichier ne doit pas dépasser 2MB.');
                this.value = '';
            }
            
            const fileType = this.files[0] ? this.files[0].type : '';
            if (fileType && !fileType.startsWith('image/')) {
                alert('Veuillez sélectionner une image (JPG, PNG).');
                this.value = '';
            }
        });
    }
});
