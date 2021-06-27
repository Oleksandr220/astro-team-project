import { onLoader, stopLoader } from './main/loader';
import createPage from './paginationWithDots';

const paginationPageList = document.querySelector('[data-library-pagination]');
const elBtnWatched = document.querySelector('[data-watched-header');
const listOfMovie = document.querySelector('.js-gallery');
const queryToGet = 'watched';

elBtnWatched.addEventListener('click', getWatchedId);
const savedItemsWatched = JSON.parse(localStorage.getItem(queryToGet));

let dataMoviesWatched;
if (savedItemsWatched !== null) {
  dataMoviesWatched = [...savedItemsWatched];
}

function getWatchedId() {
  listOfMovie.innerHTML = '';
  document.getElementById('pagination').innerHTML = '';
  paginationPageList.innerHTML = '';
  onLoader();
  if (localStorage.length > 0) {
    let query = '';
    let totalMovies = dataMoviesWatched.length;
    if (document.documentElement.clientWidth >= 769) {
      let moviesOnPage = 18;
      document.getElementById('pagination').innerHTML = '';
      createPage(totalMovies, moviesOnPage, query, dataMoviesWatched);
    } else if (
      document.documentElement.clientWidth < 769 &&
      document.documentElement.clientWidth > 468
    ) {
      let moviesOnPage = 2;
      document.getElementById('pagination').innerHTML = '';
      createPage(totalMovies, moviesOnPage, query, dataMoviesWatched);
    } else if (document.documentElement.clientWidth < 469) {
      let moviesOnPage = 1;
      document.getElementById('pagination').innerHTML = '';
      createPage(totalMovies, moviesOnPage, query, dataMoviesWatched);
    }
  }
  stopLoader();
}
