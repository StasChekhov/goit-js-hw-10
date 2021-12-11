import './css/styles.css';
import countryCard from '../src/templates/countryCard.hbs';
import countriesList from '../src/templates/countriesList.hbs';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import _ from "lodash";
const DEBOUNCE_DELAY = 300;

const refs = {
    searchbox: document.querySelector('#search-box'),
    countryInfo: document.querySelector('.country-info'),
    countryList: document.querySelector('.country-list')
}

refs.searchbox.addEventListener('input', _.debounce(handleSearch, DEBOUNCE_DELAY))


async function handleSearch(event) {
    const countryName = event.target.value;
    if (!countryName) return;
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
    const countries = await fetchCountries(countryName)
    if (!countries?.length) return;

    if (countries.length >= 5) {
        // TODO: showALert function()
       Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else {
        renderCountries(countries);
    }
}

// countries should be array of countries with length <= 4.
function renderCountries(countries) {
    let markup = "";
    let markup1 = "";

    if (countries.length === 1) {
        markup = countryCard(countries[0]);
        refs.countryInfo.innerHTML = markup;
    } else {
        countries.forEach(country => {
            console.log(country)
            markup1 += countriesList(country)
        })
        refs.countryList.innerHTML = markup1;
    }  
}