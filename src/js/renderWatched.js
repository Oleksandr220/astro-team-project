import { onLoader, stopLoader } from './main/loader';
import { numberOfMovieInLIbrary } from './main/header';
import createPage from './paginationWithDots';

export function renderWatchedList() {
  const savedItemsWatched = JSON.parse(localStorage.getItem('watched')) || [];

  let moviesOnPage = 18;

  document.getElementById('pagination').innerHTML = '';
  onLoader();
  const filmsCount = savedItemsWatched.length;
  if (filmsCount > 0) {
    let query = '';
    if (document.documentElement.clientWidth >= 769) {
      createPage(filmsCount, moviesOnPage, query, savedItemsWatched);
    } else if (
      document.documentElement.clientWidth < 769 &&
      document.documentElement.clientWidth > 468
    ) {
      /* moviesOnPage = 2; */
      createPage(filmsCount, moviesOnPage, query, savedItemsWatched);
    } else if (document.documentElement.clientWidth < 469) {
     /*  moviesOnPage = 1; */
      createPage(filmsCount, moviesOnPage, query, savedItemsWatched);
    }
  } else {
    numberOfMovieInLIbrary();
  }
  stopLoader();
}
