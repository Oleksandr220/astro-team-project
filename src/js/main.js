import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import * as apiFetchRequest from './fetchRequests';
import renderPage from './pagination';
import debounce from 'lodash.debounce';
import { API_KEY } from './API_KEY';
import { onLoader, stopLoader } from './loader';
import cardTpl from '../templates/film-card.hbs';

const input = document.querySelector('.search-input');
input.addEventListener('input', debounce(onInputMovieDetails, 300));

const movieId = '10580';
const mediaType = 'movie';
let query = '';
let numberOfPage = 1;
let totalMovies;

function startPageTrending(key, page) {
  apiFetchRequest.fetchTrending(key, page).then(movie => {
    totalMovies = movie.total_results;
    renderPage(totalMovies, numberOfPage);
  });

}

function onInputMovieDetails(e) {
  const query = e.target.value.trim();
  if (query.length < 1) {
    onInputTrending();
    return;
  };
  apiFetchRequest.fetchSearchMovie(query)
    .then(movie => {
      renderSection(movie.results);
    })

}

function onInputMovie(id, key) {
  onLoader()
  apiFetchRequest.fetchMovieDetails(id, key).then(movie => {
    console.log(movie);
    stopLoader()
  });
}

startPageTrending(API_KEY, numberOfPage);

// onInputMovieDetails(API_KEY);
// onInputMovie(movieId, API_KEY);
const refs = {
  galleryRef: document.querySelector('.js-gallery'),
  searchInput: document.querySelector('.search-input'),
}

function renderSection(card) {
  const markupCard = cardTpl(card);
  refs.galleryRef.innerHTML = markupCard;
}
refs.searchInput.addEventListener('input', debounce(onInputMovieDetails, 500));