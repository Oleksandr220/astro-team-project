import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import * as apiFetchRequest from './fetchRequests'

const userKey = '1ca3db2e1e1b7285b1391876caf4be93';
const movieId = '10580';

function onInputTrending(key) {
    apiFetchRequest.fetchTrending(key)
        .then(movie => {
            renderSection(movie.results)
        })
}

function onInputMovieDetails(e) {
    const query = e.target.value.trim();
    if (query.length < 1) {
        onInputTrending(userKey);
        return;
    };
    apiFetchRequest.fetchSearchMovie(userKey, query)
        .then(movie => {
            renderSection(movie.results);
        })
}

function onInputMovie(id, media_type) {
    apiFetchRequest.fetchMovieDetails(id, media_type)
        .then(movie => {
            console.log(movie)
        })
}


// function getTrendingSection() { onInputTrending(userKey) }
// function getSearchSection() { onInputTrending(userKey) }
// function getDetailsCard() { onInputTrending(userKey) }

onInputTrending(userKey)
// onInputMovieDetails(userKey, mediaType)
onInputMovie(movieId, userKey)
// export {getTrendingSection, getSearchSection, getDetailsCard}

import cardTpl from '../templates/film-card.hbs';

const refs = {
    galleryRef: document.querySelector('.js-gallery'),  
    searchInput: document.querySelector('.search-input'),  
}

function renderSection(card) {
        const markupCard = cardTpl(card);
        refs.galleryRef.innerHTML = markupCard;
}
refs.searchInput.addEventListener('input', onInputMovieDetails);