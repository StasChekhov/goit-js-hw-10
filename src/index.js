import './css/styles.css';
import countryCard from '../src/templates/countryCard.hbs';
import countriesList from '../src/templates/countriesList.hbs';
const DEBOUNCE_DELAY = 300;

const refs = {
    searchbox: document.querySelector('#search-box'),
    countryInfo: document.querySelector('.country-info'),
    countryList: document.querySelector('.country-list')
}

refs.searchbox.addEventListener('input', handleSearch)

const fetchCountries = (name) => fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => response.json())
    .catch(er => {
        console.warn("couldn't find any countries for you")
        return [];
    })

async function handleSearch(event) {
    const countryName = event.target.value;
    if (!countryName) return;

    const countries = await fetchCountries(countryName)
    if (!countries?.length) return;

    if (countries.length >= 5) {
        // TODO: showALert function()
        console.log('alert shown', "Too many countries");
    } else {
        renderCountries(countries);
    }
}

// countries should be array of countries with length <= 4.
function renderCountries(countries) {
    let markup;
    let markup1;

    if (countries.length === 1) {
        markup = countryCard(countries[0]);
    } else {
        countries.forEach(country => markup1 += countriesList(country))
    }
    refs.countryList.innerHTML = markup1;
    refs.countryInfo.innerHTML = markup;
}