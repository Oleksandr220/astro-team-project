import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import * as apiFetchRequest from './fetchRequests';

const debounce = require('lodash.debounce');


import { API_KEY } from './API_KEY';
const movieId = '10580';
const query = 'cat';
const mediaType = 'movie';

console.log(API_KEY)

// function onInputTrending() {
//     apiFetchRequest.fetchTrending()
//         .then(movie => {
//             renderSection(movie.results)
//         })
// }

import cardTpl from '../templates/film-card.hbs';

function onInputTrending(key, page) {
  apiFetchRequest.fetchTrending(key, page).then(movie => {
    renderSection(movie.results);
  });
}


function onInputMovieDetails(e) {
    const query = e.target.value.trim();
    if (query.length < 1) {
        onInputTrending(API_KEY);
        return;
    };
    apiFetchRequest.fetchSearchMovie(API_KEY, query)
    .then(movie => {
        renderSection(movie.results);
    })
    
}

function onInputMovie(id, key) {
    apiFetchRequest.fetchMovieDetails(id, key).then(movie => {
        console.log(movie);
    });
}

onInputTrending()

// onInputMovieDetails(API_KEY);
// onInputMovie(movieId, API_KEY);

function fetchMovieGenres(key){
    apiFetchGenres.fetchMovieGenres(key)
    .then(movie => {
        console.log(movie)
    })
}

function fetchTVGenres(key){
    apiFetchGenres.fetchTVGenres(key)
    .then(movie => {
        console.log(movie)
    })
}

fetchMovieGenres(API_KEY)
fetchTVGenres(API_KEY)
