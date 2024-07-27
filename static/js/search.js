document.getElementById('search-input').addEventListener('input', function() {
    console.log(1)
    let filter = this.value.toLowerCase();
    console.log(2)
    let projectCards = document.querySelectorAll('.card');
    console.log(3)
    projectCards.forEach(function(card) {
        console.log(4)
        let title = card.querySelector('h4').textContent.toLowerCase();
        console.log(5)
        if (title.includes(filter)) {
            console.log(6)
            card.style.display = '';
        } else {
            console.log(7)
            card.style.display = 'none';
        }
    });
});
