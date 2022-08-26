const cartas = document.querySelector("#cartas");

function criaCards() {
    ListaDeCards.cards.forEach((element,index) => {
        index = document.createElement("div");
        cartas.appendChild(index);
      index.innerHTML = `
        <figure class="card">
            <img class="card__img" src="${element.flags}" alt="Bandeira: ${element.name.common}">
            <figcaption class="card__caption">
                <h2 class="card__title">${element.name.common}</h2>
                <div class="card__information">
                    <span class="card__population"><span class="card__population--span">Population: </span> ${element.population}</span>
                    <span class="card__region"><span class="card__region--span">Region: </span> ${element.region}</span>
                    <span class="card__capital"><span class="card__capital--span">Capital: </span>${element.capital}</span>
                </div>
            </figcaption>
        </figure>
        `
    });
}