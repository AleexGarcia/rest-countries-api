const cartas = document.querySelector("#cartas");
function criaCards(){
    buscaCard();
    ListaDeCards.cards.forEach(element => {
        cartas.innerHTML = `
        <figure class="card">
            <img class="card__img" src="${element.flags}" alt="Bandeira: ${element.name.common}">
            <figcaption class="card__caption">
                <h2 class="card__title">${element.name.common}</h2>
                <div class="card__information">
                    <span class="card__population">Population: ${element.population}</span>
                    <span class="card__region">Region: ${element.region}</span>
                    <span class="card__capital">Capital:${element.capital}</span>
                </div>
            </figcaption>
        </figure>
        
        `
        
    });
}