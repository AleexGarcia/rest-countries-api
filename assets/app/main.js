const cartas = document.querySelector("#cartas");
class Card {

    constructor(flags, name, population, region, subregion, capital, domain, currencies, languages, borders) {
        this.flags = flags;
        this.name = name;
        this.population = population;
        this.region = region;
        this.subregion = subregion;
        this.capital = capital;
        this.tld = domain;
        this.currencies = currencies;
        this.languages = languages;
        this.borders = borders;

    }

}
class ListCard {
    constructor() {
        this.cards = [];
    }
    adiciona(card) {
        this.cards.push(card);
    }
}
const ListaDeCards = new ListCard;

async function buscaCard() {
    try {
        let consultaCountries = await fetch("https://restcountries.com/v3.1/all");
        let consultaCountriesConvertida = await consultaCountries.json();
        consultaCountriesConvertida.forEach(element => {
            ListaDeCards.adiciona(new Card(
                element.flags.png,
                element.name,
                element.population,
                element.region,
                element.subregion,
                element.capital,
                element.tld,
                element.currencies,
                element.languages,
                element.borders
            ));
        });
        criaCards();
        cardsHTML = document.querySelectorAll('#card-box');
        
       
    } catch (erro) {
        console.log(erro);
    }
}

function criaCards() {
    ListaDeCards.cards.forEach((element, index) => {
        let i = index;
        index = document.createElement("div");
        index.id = `card-box`;
        index.classList.add('card-box');
        index.setAttribute('data-region', element.region);
        index.setAttribute('data-name', element.name.common);
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



buscaCard();