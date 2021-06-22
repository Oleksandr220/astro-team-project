import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import * as apiFetchRequest from './fetchRequests';
import renderPage from './pagination';
import debounce from 'lodash.debounce';
import { API_KEY } from './API_KEY';
import {onLoader, stopLoader} from './loader'
const input = document.querySelector('.search-input');
input.addEventListener('input', debounce(onInputMovieDetails, 300));

const movieId = '10580';
const mediaType = 'movie';
let query = '';
let numberOfPage = 1;
let totalMovies = 20;

function startPageTrending(key, page) {
  console.log('page in Trending: ', page);
  console.log('key in Trending: ', key);
  onLoader()
  apiFetchRequest.fetchTrending(key, page).then(movie => {
    totalMovies = movie.total_results;
    renderPage(movie.results);
    stopLoader()
  });
  
}

function onInputMovieDetails(e) {
  let query = e.target.value.toLowerCase().trim();
  let numberOfPage = 1;
  // if (query.length < 1) {
  //   onInputTrending(API_KEY);
  //   return;
  // }
  onLoader()
  apiFetchRequest.fetchSearchMovie(API_KEY, numberOfPage, query).then(movie => {
    console.log('query: ', query);
    totalMovies = movie.total_results;
    renderPage(movie.results, query);
    stopLoader()
  });
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
