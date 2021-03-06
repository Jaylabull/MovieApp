const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d5aa2a05a1c924113bef57fbe3ae896f&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=d5aa2a05a1c924113bef57fbe3ae896f&query="';

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

//Get initial movies
getMovies(API_URL)

async function getMovies (url) {

    const resp = await fetch(url);
    const data = await resp.json(); 
    // ^ gives actual data 
    showMovies(data.results);
}

//Grabs movie info from API
function showMovies (movies) 
{
    main.innerHTML = '';

    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview} = movie;

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = ` 
        <div class = "movie">
            <img src="${IMG_PATH + poster_path}" alt="${title}>
            <div class = "movie-info">
                <h3>${title}</h3>
                <span class = "${getClassRate(vote_average)}"> ${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        </div>`
        

        main.appendChild(movieElement)
    })
}
 
function getClassRate(vote){
    
    if(vote >= 8 ){
        return "green"
    } else if (vote >= 5){
        return "orange"
    }else {
        return "red"
    }
}

form.addEventListener('submit', (e) => {

    e.preventDefault()

    const searchTerm = search.value;

    if(searchTerm && searchTerm !== ''){

        getMovies(SEARCH_API + searchTerm);

        search.value = '';
    } 
    else{
        window.location.reload();
    }
})