import { API_KEY } from '../objects/API_KEY';

function fetchTrending(key, page) {
  return fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${key}&page=${page}`)
    .then(response => {
      return response.json();
    })
      //этот then для показа результата
      .then(mov => console.log(mov))
      //
    .catch('onError');
}
fetchTrending(API_KEY,1)

function fetchSearchMovie(API_KEY, numberOfPage, query) {
    return fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&page=${numberOfPage}&include_adult=false&query=${query}`
    )
    .then(response => {
      return response.json();
    })
    .catch('onError');
}

function fetchMovieDetails(id) {
  return fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`)
    .then(response => {
      return response.json();
    })
    .catch('onError');
}

export { fetchTrending, fetchSearchMovie, fetchMovieDetails };