// Onload Document
(async function () {
  let keyword = "Harry Potter";
  const movies = await getMovies(keyword);
  updateUI(movies);
})();

// When Search Button Is Clicked
const searchbtn = document.querySelector(".search-btn");
searchbtn.addEventListener("click", async function () {
  let keyword = document
    .querySelector(".keyword-search")
    .value.match(/\b.*[a-z]/g);
  if (keyword != null) {
    keyword = keyword.join("");
  } else {
    keyword = "Harry Potter";
  }
  const movies = await getMovies(keyword);
  updateUI(movies);
});

// Event Binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-btn")) {
    const imdbid = e.target.dataset.id;
    const movie = await getDetailMovie(imdbid);
    const detailMovieContainer = document.querySelector(".detail-container");
    detailMovieContainer.innerHTML = showDetailCards(movie);
  }
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=3036ae23&s=" + keyword)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUI(movies) {
  let card = "";
  movies.forEach((movie) => (card += showCards(movie)));
  const cardContainer = document.querySelector(".container-movies");
  cardContainer.innerHTML = card;
}

function getDetailMovie(id) {
  return fetch("http://www.omdbapi.com/?apikey=3036ae23&i=" + id)
    .then((response) => response.json())
    .then((movie) => movie);
}

function showCards(movie) {
  return `<div class="col-md-3 my-4">
                <div class="card h-100">
                    <img src="${movie.Poster}" class="card-img-top" />
                    <div class="card-body">
                      <h5 class="card-title">${movie.Title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                      <a href="#" class="btn btn-primary modal-detail-btn" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-id="${movie.imdbID}">Details</a>
                    </div>
                </div>
            </div>`;
}

function showDetailCards(movie) {
  return `<div class="container-fluid">
              <div class="row">
                <div class="col-md-3 d-flex align-items-center justify-content-center">
                  <img src="${movie.Poster}" class="img-fluid" />
                </div>
                <div class="col-md my-3">
                  <ul class="list-group">
                    <li class="list-group-item"><h4>${movie.Title}</h4></li>
                    <li class="list-group-item"><strong>Genre : </strong>${movie.Genre}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${movie.Actors}</li>
                    <li class="list-group-item">
                      <strong>Rating : </strong>${movie.imdbRating}
                    </li>
                    <li class="list-group-item"><strong>Plot : </strong>${movie.Plot}</li>
                  </ul>
                </div>
              </div>
            </div>`;
}
