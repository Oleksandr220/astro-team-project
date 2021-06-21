import { onError } from './main';


const API_Key = '1ca3db2e1e1b7285b1391876caf4be93';


function fetchTrending () {
   return fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_Key}`)
.then(response =>  {
    return response.json()
})
.catch(onError);
}


function fetchSearchMovie(query){
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&language=en-US&page=1&include_adult=false&query=${query}`)
    .then(response =>  {
        return response.json()
=======
function fetchTrending(key, page) {
  return fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}&page=${page}`)
    .then(response => {
      return response.json();
    })
    .catch(onError);
}

function fetchSearchMovie(key) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=cat`,
  )
    .then(response => {
      return response.json();

    })
    .catch(onError);
}


function fetchMovieDetails(id, media_type){
    return fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_Key}&language=en-US`)
    .then(response =>  {
        return response.json()

function fetchMovieDetails(id, key) {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`)
    .then(response => {
      return response.json();

    })
    .catch(onError);
}

export { fetchTrending, fetchSearchMovie, fetchMovieDetails };
