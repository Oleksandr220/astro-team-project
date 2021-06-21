import { onError } from './main';


import { API_KEY } from './API_KEY';


function fetchTrending () {
   return fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
    .then(response =>  {
        return response.json()
    })
    .catch(onError);
}


function fetchSearchMovie(query){
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`)
    .then(response =>  {
        return response.json()
    })
    .catch(onError);
}

function fetchMovieDetails(id, media_type){
    return fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`)
    .then(response =>  {
        return response.json()
    })
    .catch(onError);
}

export { fetchTrending, fetchSearchMovie, fetchMovieDetails };
