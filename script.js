onload();
$(".search-btn").on("click", function () {
  let keyword = $(".keyword-search")
    .val()
    .match(/\b.*[a-z]/g);
  if (keyword != null) {
    keyword = keyword.join("");
  } else {
    keyword = "Harry Potter";
  }
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=3036ae23&s=" + keyword,
    success: (results) => {
      const movies = results.Search;
      let card = "";
      movies.forEach((movie) => {
        card += showCards(movie);
      });
      $(".container-movies").html(card);

      $(".modal-detail-btn").on("click", function () {
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=3036ae23&i=" + $(this).data("id"),
          success: (movie) => {
            let movDetail = showDetailCards(movie);
            $(".detail-container").html(movDetail);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function onload() {
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=3036ae23&s=Harry Potter",
    success: (results) => {
      const movies = results.Search;
      let card = "";
      movies.forEach((movie) => {
        card += showCards(movie);
      });
      $(".container-movies").html(card);

      $(".modal-detail-btn").on("click", function () {
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=3036ae23&i=" + $(this).data("id"),
          success: (movie) => {
            let movDetail = showDetailCards(movie);
            $(".detail-container").html(movDetail);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
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
