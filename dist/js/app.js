"use strict";
class Movies {
    constructor() {
        this.apiPaths = {};
        this.apiOptions = {};
        this.domElements = {};
        this.getElements();
        this.apiPrep();
        this.getMovies();
        this.formTrigger();
    }
    getElements() {
        this.domElements = {
            form: document.getElementById('form'),
            searchInput: document.getElementById('search'),
            mainWrapper: document.getElementById('main'),
        };
    }
    apiPrep() {
        this.apiPaths = {
            API_URL: `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
            IMG_PATH: `https://api.themoviedb.org/3/movie/533535/images`,
            SEARCH_API: `https://api.themoviedb.org/3/search/movie?query=`,
        };
        this.apiOptions = {
            options: {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjllNjQyNjM1MDEyNjA0NTQ5ZTIwZmJlODk4Y2MxYSIsIm5iZiI6MTcyNjkzMzY2NC42NjY5NTksInN1YiI6IjY2ZWVlNzRiOTJkMzk2ODUzODNiMTcyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.muI-v5lNiYfZR8_2k2Ghel3wWj8c86DD2jX3qKH2Xc8'
                },
            },
        };
    }
    async getMovies(url) {
        const data = await fetch(url, this.apiOptions.options);
        const json = await data.json();
        console.log(json.results.sort((a, b) => Number(b.popularity) - Number(a.popularity)));
        this.showMovies();
    }
    showMovies() {
        console.log;
    }
    formTrigger() {
        this.domElements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            let searchTerm = this.domElements.searchInput.value;
            if (searchTerm && searchTerm.length > 0) {
                this.getMovies(this.apiPaths.SEARCH_API + searchTerm);
                this.domElements.searchInput.value = "";
            }
            else {
                window.location.reload();
            }
        });
    }
}
const init = new Movies();
console.log(init);
//# sourceMappingURL=app.js.map