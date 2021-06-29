import * as apiFetchRequest from './fetches/fetchRequests';
import createPage from './paginationWithDots';
import debounce from 'lodash.debounce';
import { API_KEY } from './objects/API_KEY';
import { onLoader, stopLoader } from './main/loader';

const input = document.querySelector('.search-input');
const searchErorr = document.querySelector('.search-erorr');

input.addEventListener('input', debounce(onInputMovieDetails, 400));

input.addEventListener('keypress', event => {
  if (event.which === 13 || event.keyCode === 13) {
    event.preventDefault();
  }
});

const numberOfPage = 1;

function startPageTrending(key, page) {
  onLoader();
  apiFetchRequest.fetchTrending(key, page).then(movie => {
    let totalMovies = movie.total_results;
    let moviesOnPage = movie.results.length;
    document.getElementById('pagination').innerHTML = '';
    createPage(totalMovies, moviesOnPage);
    stopLoader();
  });
}

function onInputMovieDetails(e) {
  let query = e.target.value.toLowerCase().trim();
  document.getElementById('pagination').innerHTML = '';

  if (!searchErorr.classList.contains('visually-hiden')) {
    searchErorr.classList.add('visually-hiden');
  }

  if (!query) {
    startPageTrending(API_KEY, numberOfPage);
    return;
  }

  onLoader();
  apiFetchRequest.fetchSearchMovie(API_KEY, numberOfPage, query).then(movie => {
    let totalMovies = movie.total_results;
    let moviesOnPage = movie.results.length;
    if (totalMovies === 0) {
      searchErorr.classList.remove('visually-hiden');
    }
    createPage(totalMovies, moviesOnPage, query);
    stopLoader();
  });
}

startPageTrending(API_KEY, numberOfPage);
