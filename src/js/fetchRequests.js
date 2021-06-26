import { onError } from './renderPopularSection';
import { API_KEY } from './API_KEY';

function fetchTrending(key, page) {
  return fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&page=${page}`)
    .then(response => {
      return response.json();
    })
    .catch(onError);
}

function fetchSearchMovie(API_KEY, numberOfPage, query) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${numberOfPage}&include_adult=false&query=${query}`,
  )
    .then(response => {
      return response.json();
    })
    .catch(onError);
}

function fetchMovieDetails(id) {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then(response => {
      return response.json();
    })
    .catch(onError);
}

export { fetchTrending, fetchSearchMovie, fetchMovieDetails };
