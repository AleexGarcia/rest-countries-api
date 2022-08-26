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
    } catch (erro) {
        console.log(erro);
    }
}

buscaCard();