import { onError } from './main';


import { API_KEY } from './API_KEY';


function fetchMovieGenres () {
   return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(response =>  {
        return response.json()
    })
    .catch(onError);
}

function fetchTvGenres () {
    return fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`)
     .then(response =>  {
         return response.json()
     })
     .catch(onError);
 }

export { fetchMovieGenres, fetchTvGenres };