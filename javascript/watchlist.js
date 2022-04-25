if (localStorage.length > 0) {
  const moviesContainer = document.getElementsByClassName("movies-container")[0]
  const watchlistBtns = document.getElementsByClassName("add-watchlist-btn")
  moviesContainer.innerHTML = ``
  const localStorageKeys = []
  Object.keys(localStorage).forEach(key => {
    localStorageKeys.push(key)
    moviesContainer.innerHTML += localStorage[key]
  })
  for (let i = 0; i < watchlistBtns.length; i++) {
    watchlistBtns[i].innerHTML = `<i class="fa-solid fa-circle-minus" style="margin-inline-end: 7px;"></i>Remove`
    watchlistBtns[i].addEventListener("click", () => {
      localStorage.removeItem(localStorageKeys[i])
      location.reload()
    })
  }
}