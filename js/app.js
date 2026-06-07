const searchBar = document.getElementById('searchBar');
const button = document.getElementById('btn');
const suggestions = document.getElementById('suggestions');
const poster = document.getElementById('poster');
const apiKey = "8e0bc4a09481b877de03c7f26b891c21";
const movieTitle = document.getElementById('title');
const text = document.getElementById('paragraph');
const language = document.getElementById('lang');
const rating = document.getElementById('rating');
const year = document.getElementById('year');
const loading = document.getElementById('loading');


button.addEventListener('click', (e) => {
    e.preventDefault();
    getData();
});

searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        suggestions.innerHTML = '';
        getData();
    }
});

let timeoutId;
searchBar.addEventListener('input', (e) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        console.log(e.target.value);
        getSuggestions();
    }, 500);
});

async function getSuggestions() {
    suggestions.innerHTML = '';

    const movieName = searchBar.value.trim();
    if (!movieName) {
        suggestions.innerHTML = '';
        return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`

    try {
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results;
        movies.slice(0,5).forEach(movie => {
            const item = document.createElement('div');
            item.classList.add('suggestion-item');

            const img = document.createElement('img');
            const title = document.createElement('span');
            title.textContent = movie.title;
            img.src = movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'assetes/no-poster.svg';
            item.appendChild(img);
            item.appendChild(title);
            suggestions.appendChild(item);
            item.addEventListener('click', () => {
                searchBar.value = movie.title;
                getData();
                suggestions.innerHTML = '';
            })
        })
    }
        catch(error) {
        console.log(error);
    }
}

async function getData() {

    const movieName = searchBar.value.trim();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`

    try {

        loading.style.display = 'block';
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results.length) {
            movieTitle.textContent = "Sorry, we couldn't find any movies matching your search.";
            text.style.display = 'none';
            language.style.display = 'none';
            rating.style.display = 'none';
            year.style.display = 'none';
            poster.src = 'assetes/no-poster.svg';
            return;
        }

        const movie = data.results[0];

        movieTitle.textContent = movie.title;

        text.textContent = movie.overview || 'No description available.';
        text.style.display = 'block';

        language.textContent = `💬 Language: ${movie.original_language}`;
        language.style.display = 'block';

        rating.textContent = `⭐ Rating: ${movie.vote_average}`;
        rating.style.display = 'block';

        year.textContent = `📅 Year: ${movie.release_date.slice(0,4)}` || 'Unknown';
        year.style.display = 'block';

        poster.src = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'assetes/no-poster.svg';
        poster.onerror = () => {
            poster.src = 'assetes/no-poster.svg';
        }

            loading.style.display = 'none';
    }
    catch(error) {
        console.log(error);
        loading.style.display = 'none';
    }
    finally {
        loading.style.display = 'none';
    }
}

getData();