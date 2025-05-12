// Script pour gérer les cases à cocher personnalisées
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner toutes les cases à cocher personnalisées
    const checkmarks = document.querySelectorAll('.custom-checkbox .checkmark');
    
    // Ajouter un écouteur d'événements à chaque case à cocher
    checkmarks.forEach(checkmark => {
        checkmark.addEventListener('click', function() {
            // Trouver l'input associé à cette case à cocher
            const checkbox = this.previousElementSibling;
            
            // Inverser l'état de la case à cocher
            checkbox.checked = !checkbox.checked;
            
            // Déclencher l'événement change pour que les validations de formulaire fonctionnent
            const event = new Event('change', { bubbles: true });
            checkbox.dispatchEvent(event);
        });
    });
});
