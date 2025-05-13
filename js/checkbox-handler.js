document.addEventListener('DOMContentLoaded', function() {
    const checkmarks = document.querySelectorAll('.custom-checkbox .checkmark');
    
    checkmarks.forEach(checkmark => {
        checkmark.addEventListener('click', function() {
            const checkbox = this.previousElementSibling;
            
            checkbox.checked = !checkbox.checked;
            
            const event = new Event('change', { bubbles: true });
            checkbox.dispatchEvent(event);
        });
    });
});
