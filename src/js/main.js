import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import * as apiFetchRequest from './fetchRequests';
import renderPage from './pagination';
import debounce from 'lodash.debounce';
import { API_KEY } from './API_KEY';
import { onLoader, stopLoader } from './loader';

const input = document.querySelector('.search-input');
input.addEventListener('input', debounce(onInputMovieDetails, 400));

let query = '';
let numberOfPage = 1;
let totalMovies;

console.log(apiFetchRequest.fetchTrending(API_KEY, numberOfPage));

function startPageTrending(key, page) {
  apiFetchRequest.fetchTrending(key, page).then(movie => {
    console.log(movie);
    // for (let i = 0; i < movie.total_results.length; i += 1) {
    //   // console.log(movie.results[i].genre_ids);
    //   const movieResult = movie.results[i].genre_ids;
    //   // for (let i = 0; i < movieResult.length; i += 1)
    //   // console.log(movieResult.genre_ids[i]);
    //   console.log(movieResult);
    // }
    
    totalMovies = movie.total_results;
    renderPage(totalMovies, numberOfPage);
    // for (let i = 0; i < 20; i += 1) {
    //   // console.log(movie.results[i].genre_ids);
    //   const movieResult = movie.results[i].genre_ids;
    //   // for (let i = 0; i < movieResult.length; i += 1)
    //   // console.log(movieResult.genre_ids[i]);
    //   console.log(movieResult);
    // }
  });

}

function onInputMovieDetails(e) {
  query = e.target.value.toLowerCase().trim();
  numberOfPage = 1;
  // if (query.length < 1) {
  //   onInputTrending();
  //   return;
  // };
  apiFetchRequest.fetchSearchMovie(API_KEY, numberOfPage, query).then(movie => {
    totalMovies = movie.total_results;
    renderPage(totalMovies, numberOfPage, query);
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
