import { fetchMovieDetails } from './fetches/fetchRequests';
// import { onLoader, stopLoader } from './main/loader';
import libraryCardTpl from '../templates/library-card.hbs';

export function renderWatchedList() {
  const paginationPageList = document.querySelector('[data-library-pagination]');
  const listOfMovie = document.querySelector('.js-gallery');
  const queryToGet = 'watched';
  const savedItems = JSON.parse(localStorage.getItem(queryToGet)) || [];

  let cardOnPage = 18;
  let countOfButtons = 0;

  listOfMovie.innerHTML = '';
  paginationPageList.innerHTML = '';
  // onLoader();
  const filmsCount = savedItems.length;
  if (filmsCount > 0) {
    if (document.documentElement.clientWidth >= 769) {
      cardOnPage = 18;
      countOfButtons = createCountOfButtons(filmsCount, cardOnPage);
      createButtonsArray(paginationPageList, countOfButtons);
    } else if (
      document.documentElement.clientWidth < 769 &&
      document.documentElement.clientWidth > 468
    ) {
      cardOnPage = 2;
      countOfButtons = createCountOfButtons(filmsCount, cardOnPage);
      createButtonsArray(paginationPageList, countOfButtons);
    } else if (document.documentElement.clientWidth < 469) {
      cardOnPage = 1;
      countOfButtons = createCountOfButtons(filmsCount, cardOnPage);
      createButtonsArray(paginationPageList, countOfButtons);
    }
  }

  for (let id of savedItems) {
    fetchMovieDetails(id).then(movie => {
      listOfMovie.insertAdjacentHTML('afterbegin', libraryCardTpl(movie));
    });
  }
  // stopLoader();
}

function createCountOfButtons(filmsCount, cardOnPage) {
  return Math.ceil(filmsCount / cardOnPage);
}

function createButtonsArray(paginationRef, countOfButtons) {
  for (let i = 1; i <= countOfButtons; i += 1) {
    let paginationButton = document.createElement('li');
    paginationButton.innerHTML = i;
    paginationRef.appendChild(paginationButton);
  }
}
