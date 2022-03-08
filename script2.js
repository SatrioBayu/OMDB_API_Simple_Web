(function () {
  fetch("http://www.omdbapi.com/?apikey=3036ae23&s=Harry Potter")
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let card = "";
      movies.forEach((movie) => (card += showCards(movie)));
      const cardContainer = document.querySelector(".container-movies");
      cardContainer.innerHTML = card;

      // Detail
      const detailBtn = document.querySelectorAll(".modal-detail-btn");
      detailBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
          fetch("http://www.omdbapi.com/?apikey=3036ae23&i=" + this.dataset.id)
            .then((response) => response.json())
            .then((movie) => {
              const detailMovie = showDetailCards(movie);
              const detailMovieContainer =
                document.querySelector(".detail-container");
              detailMovieContainer.innerHTML = detailMovie;
            });
        });
      });
    });
})();

const searchbtn = document.querySelector(".search-btn");
searchbtn.addEventListener("click", function () {
  let keyword = document
    .querySelector(".keyword-search")
    .value.match(/\b.*[a-z]/g);
  if (keyword != null) {
    keyword = keyword.join("");
  } else {
    keyword = "Harry Potter";
  }
  fetch("http://www.omdbapi.com/?apikey=3036ae23&s=" + keyword)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let card = "";
      movies.forEach((movie) => (card += showCards(movie)));
      const cardContainer = document.querySelector(".container-movies");
      cardContainer.innerHTML = card;

      // Detail Modal
      const detailBtn = document.querySelectorAll(".modal-detail-btn");
      detailBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
          fetch("http://www.omdbapi.com/?apikey=3036ae23&i=" + this.dataset.id)
            .then((response) => response.json())
            .then((movie) => {
              const detailMovie = showDetailCards(movie);
              const detailMovieContainer =
                document.querySelector(".detail-container");
              detailMovieContainer.innerHTML = detailMovie;
            });
        });
      });
    });
});

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
