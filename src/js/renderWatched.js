import { fetchMovieDetails } from './fetches/fetchRequests';
// import { onLoader, stopLoader } from './main/loader';
import libraryCardTpl from '../templates/library-card.hbs';
import createPage from './paginationWithDots';

export function renderWatchedList() {
  const paginationPageList = document.querySelector('[data-library-pagination]');
  const listOfMovie = document.querySelector('.js-gallery');
  const queryToGet = 'watched';
  const savedItems = JSON.parse(localStorage.getItem(queryToGet)) || [];

  let cardOnPage = 18;
  let countOfButtons = 0;

  listOfMovie.innerHTML = '';
  document.getElementById('pagination').innerHTML = '';
  paginationPageList.innerHTML = '';
  // onLoader();
  const filmsCount = savedItems.length;
  if (filmsCount > 0) {
    let query = '';
    const paginationRef = document.getElementById('pagination');
    if (document.documentElement.clientWidth >= 769) {
      paginationRef.innerHTML = '';
      createPage(filmsCount, moviesOnPage, query, savedItems);
    } else if (
      document.documentElement.clientWidth < 769 &&
      document.documentElement.clientWidth > 468
    ) {
      moviesOnPage = 2;
      paginationRef.innerHTML = '';
      createPage(filmsCount, moviesOnPage, query, savedItems);
    } else if (document.documentElement.clientWidth < 469) {
      moviesOnPage = 1;
      paginationRef.innerHTML = '';
      createPage(filmsCount, moviesOnPage, query, savedItems);
    }
  }

  for (let id of savedItems) {
    fetchMovieDetails(id).then(movie => {
      listOfMovie.insertAdjacentHTML('afterbegin', libraryCardTpl(movie));
    });
  }
  // stopLoader();
}
