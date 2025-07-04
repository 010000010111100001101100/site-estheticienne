/*
  Charge les horaires depuis data/horaires.json et met à jour la grille sur la page Contact.
*/
(function() {
  function updateGrid(data) {
    const grid = document.getElementById('hours-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    const labels = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    jours.forEach((key, idx) => {
      const item = document.createElement('div');
      item.className = 'hours-item';
      item.innerHTML = `<div class="day">${labels[idx]}</div><div class="time">${data[key] || ''}</div>`;
      grid.appendChild(item);
    });
  }

  fetch('/data/horaires.json', {cache: 'no-cache'})
    .then(r => r.json())
    .then(updateGrid)
    .catch(err => console.error('Erreur de chargement des horaires', err));
})();
