const cartas = document.querySelector("#cartas");
const filtroBusca = document.querySelector('#search-filter');
const moreInfo = document.querySelector('#more-info');

class Card {

    constructor(flags, name, nativeName, population, region, subregion, capital, domain, currencies, languages, borders, alpha3Code) {
        this.flags = flags;
        this.name = name;
        this.nativeName = nativeName;
        this.population = population;
        this.region = region;
        this.subregion = subregion;
        this.capital = capital;
        this.topLevelDomain = domain;
        this.currencies = currencies;
        this.languages = languages;
        this.borders = borders;
        this.alpha3Code = alpha3Code;
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
        let consultaCountries = await fetch("https://restcountries.com/v2/all");
        let consultaCountriesConvertida = await consultaCountries.json();
        consultaCountriesConvertida.forEach(element => {
            ListaDeCards.adiciona(new Card(
                element.flags.png,
                element.name,
                element.nativeName,
                element.population,
                element.region,
                element.subregion,
                element.capital,
                element.topLevelDomain[0],
                element.currencies,
                element.languages,
                element.borders,
                element.alpha3Code
            ));
        });
        criaCards();
        cardsHTML = document.querySelectorAll('.card-box');
        figureCaption = document.querySelectorAll('.card__caption');

    } catch (erro) {
        console.log(erro)
        cartas.innerHTML = '<p>Erro na requisição dos dados na API</p>'
    }
}

function criaCards() {
    ListaDeCards.cards.forEach((element, index) => {

        let div = document.createElement("div");
        div.id = index;
        div.classList.add('card-box');
        div.setAttribute('data-region', element.region);
        div.setAttribute('data-name', element.name);
        cartas.appendChild(div);
        div.innerHTML = `
        <figure class="card">
            <img class="card__img" src="${element.flags}" alt="Bandeira: ${element.name}">
            <figcaption class="card__caption">
                <h2 class="card__title">${element.name}</h2>
                <div class="card__information">
                    <span class="card__population"><span class="card__population--span">Population: </span> ${element.population}</span>
                    <span class="card__region"><span class="card__region--span">Region: </span> ${element.region}</span>
                    <span class="card__capital"><span class="card__capital--span">Capital: </span>${element.capital != undefined ? element.capital : `There is no capital`}</span>
                </div>
            </figcaption>
        </figure>
        `
    });
}

cartas.addEventListener('click', e => {

    e.composedPath().forEach(e => {
        let exp = RegExp(/\d/)
        if (exp.test(e.id)) {
            var idClicado = e.id;
          ExibeMoreInfo(idClicado);
        }
    });

})


function ExibeMoreInfo(id) {
    let element = ListaDeCards.cards[id];
    let templateInfo = `
       
        <button id="more-info__btn" class="more-info__btn">Back</button>
        <figure id="country" class="country">
            <img src="${element.flags}" alt="Bandeira: ${element.name}" class="country__img">
            <figcaption class="country__info">
                <h1 class="country__name">${element.name}</h1>
                <div class="info-1">
                    <span class="country__name-native" ><strong>Native Name: </strong>${element.nativeName
        }
                        </span>
                    <span class="country__population"><strong>Population: </strong>${element.population}</span>
                    <span class="country__region"><strong>Region: </strong>${element.region}</span>
                    <span class="country__sub-region"><strong>Sub Region: </strong>${element.subregion}</span>
                    <span class="country__capital"><strong>Capital: </strong>${element.capital}</span>
                </div>
                <div class="info-2">
                    <span class="country__domain"><strong>Top Level Domain: </strong>${element.topLevelDomain}</span>
                    <span class="country__currencies"><strong>Currencies: </strong>${element.currencies[0].name}</span>
                    <span class="country__languages"><strong>Languages: </strong>${element.languages.map(e => {
            return `${e.name} `
        })}</span>
                </div>
                <div class="info__border">
                    <span class="country__border">Border Countries</span>
                    <div class="border__links">
                    ${element.borders != null ? element.borders.map(sigla => {
            for (let i = 0; i < ListaDeCards.cards.length; i++) {

                if (sigla == ListaDeCards.cards[i].alpha3Code) {
                    return `
                             <a onclick='ExibeMoreInfo(${i})' class="country__border-country pointer">${ListaDeCards.cards[i].name}</a>
                        
                            `
                }
            }

        }).join('')
            : `<span  class="country__border-country">There are no border countries</span> `
        }
                        
                    </div>
                </div>
            </figcaption>
        </figure>
                                 
    `

    cartas.classList.add('oculto');
    filtroBusca.classList.add('oculto');
    moreInfo.innerHTML = templateInfo;

    botaoRetornar();
 

}

function botaoRetornar() {
    back = document.querySelector('#more-info__btn');
    back.addEventListener('click', () => {
        filtroBusca.classList.remove('oculto');
        cartas.classList.remove('oculto');
        moreInfo.innerHTML = "";
    })
    
}


buscaCard();
