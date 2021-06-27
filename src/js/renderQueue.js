// import { onLoader, stopLoader } from './main/loader';
import createPage from './paginationWithDots';

export function renderQueueList() {
  const paginationPageList = document.querySelector('[data-library-pagination]');
  const savedItems = JSON.parse(localStorage.getItem('queue')) || [];

  let moviesOnPage = 18;

  document.getElementById('pagination').innerHTML = '';
  paginationPageList.innerHTML = '';
  // onLoader();
  const filmsCount = savedItems.length;
  if (filmsCount > 0) {
    let query = '';
    if (document.documentElement.clientWidth >= 769) {
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
    }
    // stopLoader();
  }
}
