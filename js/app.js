const searchBar = document.getElementById('searchBar');
const button = document.getElementById('btn');
const card = document.getElementById('cardContainer');
const poster = document.getElementById('poster');
const apiKey = "8e0bc4a09481b877de03c7f26b891c21";
const movieTitle = document.getElementById('title');
const text = document.getElementById('paragraph');
const language = document.getElementById('lang')


button.addEventListener('click', (e) => {
    e.preventDefault();
    getData();
});

async function getData() {

    const movieName = searchBar.value;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`

    try {
        const response = await fetch(url);
        const data = await response.json();
        const movie = data.results[0];
        console.log(movie);
        movieTitle.textContent = movie.title;
        text.textContent = movie.overview;
        language.textContent =`Language: ${movie.original_language}`;
        poster.src = `https:/image.tmdb.org/t/p/w500${movie.poster_path}`;
    }
    catch(error) {
        console.log(error);
    }
}

getData();