import { onLoader, stopLoader } from './main/loader';
import { numberOfMovieInLIbrary } from './main/header';
import createPage from './paginationWithDots';

export function renderQueueList() {
  const savedItemsQueue = JSON.parse(localStorage.getItem('queue')) || [];

  let moviesOnPage = 18;

  document.getElementById('pagination').innerHTML = '';
  onLoader();
  const filmsCount = savedItemsQueue.length;
  if (filmsCount > 0) {
    let query = '';
    createPage(filmsCount, moviesOnPage, query, savedItemsQueue);
  } else {
    numberOfMovieInLIbrary();
  }
  stopLoader();
}
