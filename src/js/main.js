import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import * as apiFetchRequest from './fetchRequests'

const userKey = '1ca3db2e1e1b7285b1391876caf4be93';
const movieId = 10580;



function onInputTrending(key) {
    apiFetchRequest.fetchTrending(key)
        .then(movie => {
            console.log(movie)
        })
}

function onInputMovieDetails(key) {
    apiFetchRequest.fetchSearchMovie(key)
        .then(movie => {
            console.log(movie)
        })
}

function onInputMovie(id, key) {
    apiFetchRequest.fetchMovieDetails(id, key)
        .then(movie => {
            console.log(movie)
        })
}


onInputTrending(userKey)
onInputMovieDetails(userKey)
onInputMovie(movieId, userKey)