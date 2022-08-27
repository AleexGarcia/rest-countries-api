searchInput = document.querySelector('#busca');
searchIcon = document.querySelector('#search-icon');

searchInput.addEventListener('input', function () {
    
    if (this.value.length > 0) {
        cardsHTML.forEach( e => {
            exp = new RegExp(this.value, 'i');

            if (!exp.test(e.dataset.name)) {
                e.classList.add('oculto');
            } else {
                e.classList.remove('oculto');
            }
        })
    } else {
        cardsHTML.forEach(e => {
            e.classList.remove('oculto');
        })
    }

})