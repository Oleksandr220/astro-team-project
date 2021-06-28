// import { onLoader, stopLoader } from './main/loader';
import { declOfMovie } from './main/header';
import createPage from './paginationWithDots';

export function renderQueueList() {
  const savedItemsQueue = JSON.parse(localStorage.getItem('queue')) || [];

  let moviesOnPage = 18;

  document.getElementById('pagination').innerHTML = '';
  // onLoader();
  const filmsCount = savedItemsQueue.length;
  if (filmsCount > 0) {
    let query = '';
    if (document.documentElement.clientWidth >= 769) {
      if (document.documentElement.clientWidth >= 769) {
        createPage(filmsCount, moviesOnPage, query, savedItemsQueue);
      } else if (
        document.documentElement.clientWidth < 769 &&
        document.documentElement.clientWidth > 468
      ) {
        moviesOnPage = 2;
        createPage(filmsCount, moviesOnPage, query, savedItems);
      } else if (document.documentElement.clientWidth < 469) {
        moviesOnPage = 1;
        createPage(filmsCount, moviesOnPage, query, savedItemsQueue);
      }
    }
  } else {
    const watchList = localStorage.getItem('watched');
    const length = watchList ? watchList.length : 0;
    document.querySelector(
      '.js-gallery',
    ).innerHTML = `<h2 class="modal-title">${length} ${declOfMovie(length)} in Watched List / 0 movies in Queue List</h2>`;
  }
  // stopLoader();
}
