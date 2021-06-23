import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import * as apiFetchRequest from './fetchRequests';
import renderPage from './pagination';
import debounce from 'lodash.debounce';
import { API_KEY } from './API_KEY';
import { onLoader, stopLoader } from './loader';
<<<<<<< HEAD
=======

const input = document.querySelector('.search-input');
input.addEventListener('input', debounce(onInputMovieDetails, 400));
>>>>>>> one-more-fixed-rendering

const input = document.querySelector('.search-input');
input.addEventListener('input', debounce(onInputMovieDetails, 400));
input.addEventListener('keypress', event => {
  if (event.which === 13 || event.keyCode === 13) {
    event.preventDefault();
    // return false;
  }
});

let query = '';
let numberOfPage = 1;
let totalMovies;

function startPageTrending(key, page) {
  onLoader()
  apiFetchRequest.fetchTrending(key, page).then(movie => {
    console.log(movie)
    totalMovies = movie.total_results;
    renderPage(totalMovies, numberOfPage);
    
    stopLoader()
  });
}

function onInputMovieDetails(e) {
  query = e.target.value.toLowerCase().trim();
  numberOfPage = 1;
<<<<<<< HEAD
 
  onLoader()
  apiFetchRequest.fetchSearchMovie(API_KEY, numberOfPage, query).then(movie => {
    
    totalMovies = movie.total_results;
    renderPage(totalMovies, numberOfPage, query);
    stopLoader()
=======
  // if (query.length < 1) {
  //   onInputTrending();
  //   return;
  // };
  apiFetchRequest.fetchSearchMovie(API_KEY, numberOfPage, query).then(movie => {
    totalMovies = movie.total_results;
    renderPage(totalMovies, numberOfPage, query);
>>>>>>> one-more-fixed-rendering
  });
}

function onInputMovie(id, key) {
  onLoader();
  apiFetchRequest.fetchMovieDetails(id, key).then(movie => {
    console.log(movie);
    stopLoader();
  });
}

startPageTrending(API_KEY, numberOfPage);
<<<<<<< HEAD

// onInputMovieDetails(API_KEY);
// onInputMovie(movieId, API_KEY);
=======
>>>>>>> one-more-fixed-rendering
