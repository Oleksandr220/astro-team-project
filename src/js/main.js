import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import * as apiFetchRequest from './fetchRequests';

const movieId = '10580';
const query = 'cat';
const mediaType = 'movie';



function onInputTrending() {
    apiFetchRequest.fetchTrending()
        .then(movie => {
            renderSection(movie.results)
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
// function getTrendingSection() { onInputTrending(userKey) }
// function getSearchSection() { onInputTrending(userKey) }
// function getDetailsCard() { onInputTrending(userKey) }

// export {getTrendingSection, getSearchSection, getDetailsCard}

import cardTpl from '../templates/film-card.hbs';

function onInputTrending(key, page) {
  apiFetchRequest.fetchTrending(key, page).then(movie => {
    renderSection(movie.results);
  });
}

function onInputMovieDetails(key) {
  apiFetchRequest.fetchSearchMovie(key).then(movie => {
    console.log(movie);
  });
}

function onInputMovie(id, key) {
  apiFetchRequest.fetchMovieDetails(id, key).then(movie => {
    console.log(movie);
  });
}


onInputMovieDetails(userKey);
onInputMovie(movieId, userKey);
export default { onInputTrending, onInputMovieDetails, onInputMovie }

