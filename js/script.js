const baseUrl = "https://api.themoviedb.org/3/movie/"
const key = "?api_key=c12141d3c272f8073f5940dcfd4f0ba3";

// Funktion til at håndtere, hvilken kategori der skal fetches og vises
function fetchMovies(endpoint) {
    document.querySelectorAll("button").forEach(btn => btn.classList.remove('active')); // Fjern 'active' fra alle knapper
    document.getElementById(endpoint).classList.add('active'); // Tilføj 'active' til den klikkede knap

    document.getElementById("movies_container").innerHTML = ""; // Ryd indholdet før nyt data

    fetch(baseUrl + endpoint + key)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(movie => {
                const movieTitle = document.createElement("h2");
                movieTitle.textContent = movie.title;

                const movieOverview = document.createElement("p");
                movieOverview.textContent = movie.overview;

                const originalTitle = document.createElement("p");
                originalTitle.innerHTML = `<strong>Original title:</strong> ${movie.original_title}`;

                const releaseDate = document.createElement("p");
                releaseDate.innerHTML = `<strong>Release date:</strong> ${movie.release_date}`;

                const imageElement = document.createElement("img");
                imageElement.setAttribute('src', "https://image.tmdb.org/t/p/w300/" + movie.poster_path);

                const theSpan = document.createElement("span");
                theSpan.append(movieOverview, originalTitle, releaseDate);

                const theDiv = document.createElement("div");
                theDiv.append(imageElement, theSpan);

                const movieArticle = document.createElement("article");
                movieArticle.append(movieTitle, theDiv);

                document.getElementById("movies_container").append(movieArticle);
            });
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
            document.getElementById("movies_container").textContent = "Failed to load movies. Please try again later.";
        });
}

// Tilføj event listeners til de enkelte knapper
document.getElementById("now_playing").addEventListener("click", () => fetchMovies("now_playing"));
document.getElementById("popular").addEventListener("click", () => fetchMovies("popular"));
document.getElementById("top_rated").addEventListener("click", () => fetchMovies("top_rated"));
document.getElementById("upcoming").addEventListener("click", () => fetchMovies("upcoming"));

// Vis 'Now playing' film, når siden loader
window.onload = () => fetchMovies("now_playing");
