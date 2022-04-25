const omdbApiKey = "e6d76d6c"
const baseUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&`
const moviesContainer = document.getElementsByClassName("movies-container")[0]

async function getMovieHtml(titleQuery="t=blade+runner") {
  const endpoint = baseUrl + titleQuery
  const response = await fetch(endpoint)
  const data = await response.json()
  if (data.Response === "False") {
    return `
          <div class="empty-movies">
            <i class="fa-solid fa-bug"></i>
            <p class="error-msg">
              Unable to find what you're looking for. Please try another search.
            </p>
          </div>`
  } else {
    return `
          <div class="movie">
            <img
              src="${data.Poster}"
              alt="Poster for ${data.Title}"
            />
            <div class="movie-info-container">
              <h2>
                ${data.Title} <i class="fa-solid fa-star"></i>
                <span class="rating">${data.imdbRating}</span>
              </h2>
              <div class="items-container">
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <button class="add-watchlist-btn"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
              </div>
              <p class="plot-summary">
                ${data.Plot}
              </p>
            </div>
          </div>`
  }
}

document.getElementById("search-btn").addEventListener("click", async () => {
  const searchInput = document.getElementById("movie-search-inpt")
  const inputQuery = "t=" + searchInput.value.toLowerCase().replaceAll(" ", "+")
  const watchlistBtns = document.getElementsByClassName("add-watchlist-btn")
  const movieHtml = await getMovieHtml(inputQuery)
  moviesContainer.innerHTML = movieHtml

  for (const btn of watchlistBtns) {
    btn.addEventListener("click", () => {
      localStorage.setItem(searchInput.value, movieHtml)
      searchInput.value = ``
      searchInput.placeholder = "Enter another movie..."
      moviesContainer.innerHTML = `
      <div class="empty-movies">
        <p>
          Movie successfully added! <br />
          Search for another film <br />
          <br />
          or <br />
          <br />
          <a href="watchlist.html">See your Watchlist</a>
        </p>
      </div>`
  })}
})
