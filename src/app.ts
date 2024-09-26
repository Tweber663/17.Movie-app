
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

}

class Movies implements Checking {
    apiPaths: ApiPaths;
    apiOptions: ApiOptions;
    domElements: DomElements;

    
    constructor() {
        this.apiPaths = {} as ApiPaths;
        this.apiOptions = {} as ApiOptions;
        this.domElements = {} as DomElements;
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
            IMG_PATH: `https://api.themoviedb.org/3/movie/533535/images`,
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
            console.log(json.results.sort((a, b) => Number(b.popularity) - Number(a.popularity)));
            this.showMovies();
        }

    showMovies() {
        console.log
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