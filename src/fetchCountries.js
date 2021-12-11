export const fetchCountries = (name) => fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            Notiflix.Notify.failure("Oops, there is no country with that name")
            return [];

        }
    })
    // .catch(er => {
    //     Notiflix.Notify.failure("Oops, there is no country with that name")
    //     return [];
    // })