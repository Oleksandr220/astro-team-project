import { onError } from './main';

function fetchTrending(key, page) {
  return fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}&page=${page}`)
    .then(response => {
      return response.json();
    })
    .catch(onError);
}

function fetchSearchMovie(key, query){
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${query}`)
    .then(response =>  {
        return response.json()

    })
    .catch(onError);
}

function fetchMovieDetails(id, key) {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`)
    .then(response => {
      return response.json();
    })
    .catch(onError);
}

export { fetchTrending, fetchSearchMovie, fetchMovieDetails };
