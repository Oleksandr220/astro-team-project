import { onLoader, stopLoader } from './main/loader';
import createPage from './paginationWithDots';

const elBtnQueue = document.querySelector('[data-queue-header');
const listOfMovie = document.querySelector('.js-gallery');
const queryToGet = 'queue';

elBtnQueue.addEventListener('click', getQueueId);
const savedItemsQueue = JSON.parse(localStorage.getItem(queryToGet));

let dataMoviesQueue;
if (savedItemsQueue !== null) {
  dataMoviesQueue = [...savedItemsQueue];
}

function getQueueId() {
  listOfMovie.innerHTML = '';
  document.getElementById('pagination').innerHTML = '';
  onLoader();
  if (localStorage.length > 0) {
    let query = '';
    let totalMovies = dataMoviesQueue.length;
    if (document.documentElement.clientWidth >= 769) {
      let moviesOnPage = 18;
      createPage(totalMovies, moviesOnPage, query, dataMoviesQueue);
    } else if (
      document.documentElement.clientWidth < 769 &&
      document.documentElement.clientWidth > 468
    ) {
      let moviesOnPage = 2;
      createPage(totalMovies, moviesOnPage, query, dataMoviesQueue);
    } else if (document.documentElement.clientWidth < 469) {
      let moviesOnPage = 1;
      createPage(totalMovies, moviesOnPage, query, dataMoviesQueue);
    }
  }
  stopLoader();
}
