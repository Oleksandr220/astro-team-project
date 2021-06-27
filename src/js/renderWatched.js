import { onLoader, stopLoader } from './main/loader';
import createPaginationForLibrary from './paginationWithoutDots';

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
    let cardOnPage;
    if (document.documentElement.clientWidth >= 769) {
      cardOnPage = 18;
      createPaginationForLibrary(cardOnPage, dataMoviesWatched);
    } else if (
      document.documentElement.clientWidth < 769 &&
      document.documentElement.clientWidth > 468
    ) {
      cardOnPage = 2;
      createPaginationForLibrary(cardOnPage, dataMoviesWatched);
    } else if (document.documentElement.clientWidth < 469) {
      cardOnPage = 1;
      createPaginationForLibrary(cardOnPage, dataMoviesWatched);
    }
  }
  stopLoader();
}
