import { onLoader, stopLoader } from './main/loader';
import createPaginationForLibrary from './paginationWithoutDots';

const paginationPageList = document.querySelector('[data-library-pagination]');
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
  paginationPageList.innerHTML = '';
  onLoader();
  if (localStorage.length > 0) {
    let cardOnPage;
    if (document.documentElement.clientWidth >= 769) {
      cardOnPage = 18;
      createPaginationForLibrary(cardOnPage, dataMoviesQueue);
    } else if (
      document.documentElement.clientWidth < 769 &&
      document.documentElement.clientWidth > 468
    ) {
      cardOnPage = 2;
      createPaginationForLibrary(cardOnPage, dataMoviesQueue);
    } else if (document.documentElement.clientWidth < 469) {
      cardOnPage = 1;
      createPaginationForLibrary(cardOnPage, dataMoviesQueue);
    }
  }
  stopLoader();
}
