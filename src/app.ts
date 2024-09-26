
interface ApiPaths {
    API_URL: string, 
    IMG_PATH: string, 
    SEARCH_API: string, 
}

interface ApiOptions {
    options: {
        method: string, 
        headers: {
            accept: string, 
            Authorization: string, 
        }
    }
}

interface Movie {
    popularity: string, 
    title: string, 
    id: number, 
    poster_path: string, 
    backdrop_path: string, 
    overview: string, 
    vote_average: number, 
}

interface ApiResponse {
    results: Movie[],
}

interface DomElements {
    form: HTMLFormElement, 
    searchInput: HTMLInputElement, 
    mainWrapper: HTMLDivElement,
}

interface Checking {
    apiPaths: ApiPaths, 
    apiOptions: ApiOptions,
    domElements: DomElements,  
    searchedMovies: Movie[], 
}

class Movies implements Checking {
    apiPaths: ApiPaths;
    apiOptions: ApiOptions;
    domElements: DomElements;
    searchedMovies: Movie[];
    
    constructor() {
        this.apiPaths = {} as ApiPaths;
        this.apiOptions = {} as ApiOptions;
        this.domElements = {} as DomElements;
        this.searchedMovies = [] as Movie[];
        this.getElements();
        this.apiPrep(); 
        this.getMovies();
        this.formTrigger();
    }

    public getElements(): void {
        this.domElements = {
            form: document.getElementById('form') as HTMLFormElement,
            searchInput: document.getElementById('search') as HTMLInputElement, 
            mainWrapper: document.getElementById('main') as HTMLDivElement, 
        }
    }  

    private apiPrep(): void {
        this.apiPaths = {
            API_URL: `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
            IMG_PATH: `https://media.themoviedb.org/t/p/w500`,
            SEARCH_API: `https://api.themoviedb.org/3/search/movie?query=`,
        }

        this.apiOptions = {
            options: {
                method: 'GET', 
                headers: {
                    accept: 'application/json', 
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjllNjQyNjM1MDEyNjA0NTQ5ZTIwZmJlODk4Y2MxYSIsIm5iZiI6MTcyNjkzMzY2NC42NjY5NTksInN1YiI6IjY2ZWVlNzRiOTJkMzk2ODUzODNiMTcyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.muI-v5lNiYfZR8_2k2Ghel3wWj8c86DD2jX3qKH2Xc8'
                },
            }, 
        }
    }

    private async getMovies(url: string) {
            const data = await fetch(url, this.apiOptions.options); 
            const json: ApiResponse = await data.json(); 
            this.searchedMovies = json.results.sort((a, b) => Number(b.popularity) - Number(a.popularity))
            this.showMovies();
        }
    
    getClassByRate(vote: number) {
        if (vote >= 7) {
            return 'green'
        } else if (vote >= 5) {
            return 'orange'
        } else {
            return 'red'
        }
    }

    showMovies() {
        this.domElements.mainWrapper.innerHTML = '';
        this.searchedMovies.forEach((movie) => {
            const {title, id, poster_path, backdrop_path, vote_average, overview} = movie; 
            const createElement = document.createElement('div'); 
            console.log(movie);

            createElement.classList.add('movie'); 
            createElement.innerHTML = `
                <img src="${this.apiPaths.IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="green">${vote_average.toFixed(1)}</span>
                </div>

                <div class="overview">
                    <h3>Overview</h3>
                    <p>${overview}</p>
                </div>
                `
            this.domElements.mainWrapper.appendChild(createElement);
            this.getClassByRate(vote_average); 
        })
    }

    formTrigger() {
        this.domElements.form.addEventListener('submit',(e) => {
            e.preventDefault(); 
            let searchTerm = this.domElements.searchInput.value;
            if (searchTerm && searchTerm.length > 0) {
                this.getMovies(this.apiPaths.SEARCH_API + searchTerm);
                this.domElements.searchInput.value = ""; 
            } else {
                window.location.reload();
            }
        })
        
    }

}
    
const init = new Movies(); 
console.log(init); 