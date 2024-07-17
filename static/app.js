document.getElementById('search').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function(card) {
        let title = card.querySelector('h2').textContent.toLowerCase();
        let description = card.querySelector('p').textContent.toLowerCase();
        if (title.includes(filter) || description.includes(filter)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});