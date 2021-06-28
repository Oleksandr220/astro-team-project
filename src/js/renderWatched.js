// import { onLoader, stopLoader } from './main/loader';
import { declOfMovie } from './main/header';
import createPage from './paginationWithDots';

export function renderWatchedList() {
  const savedItems = JSON.parse(localStorage.getItem('watched')) || [];

  let moviesOnPage = 18;

  document.getElementById('pagination').innerHTML = '';
  // onLoader();
  const filmsCount = savedItems.length;
  if (filmsCount > 0) {
    let query = '';
    if (document.documentElement.clientWidth >= 769) {
      createPage(filmsCount, moviesOnPage, query, savedItems);
    } else if (
      document.documentElement.clientWidth < 769 &&
      document.documentElement.clientWidth > 468
    ) {
      moviesOnPage = 2;
      createPage(filmsCount, moviesOnPage, query, savedItems);
    } else if (document.documentElement.clientWidth < 469) {
      moviesOnPage = 1;
      createPage(filmsCount, moviesOnPage, query, savedItems);
    }
  } else {
    const queueList = localStorage.getItem('queue');
    const length = queueList ? queueList.length : 0;
    document.querySelector(
      '.js-gallery',
    ).innerHTML = `<h2 class="modal-title">0 movies in Watched List / ${length} ${declOfMovie(
      length,
      ['movie', 'movies'],
    )} in Queue List</h2>`;
  }
  // stopLoader();
}
