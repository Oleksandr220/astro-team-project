import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import * as apiFetchRequest from './fetchRequests'

const movieId = '10580';
const query = 'cat';
const mediaType = 'movie';



function onInputTrending() {
    apiFetchRequest.fetchTrending()
        .then(movie => {
            console.log(movie)
        })
}

function onInputMovieDetails(query) {
    apiFetchRequest.fetchSearchMovie(query)
        .then(movie => {
            console.log(movie)
        })
}

function onInputMovie(id, media_type) {
    apiFetchRequest.fetchMovieDetails(id, media_type)
        .then(movie => {
            console.log(movie)
        })
}


onInputTrending()
onInputMovieDetails(query)
onInputMovie(movieId, mediaType)