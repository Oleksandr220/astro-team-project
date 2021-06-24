import { fetchMovieDetails } from './fetchRequests';
import { onLoader, stopLoader } from './loader';
import libraryCardTpl from '../templates/library-card.hbs';

const paginationPageList = document.querySelector('[data-library-pagination]');
const elBtnQueue = document.querySelector('[data-queue-header');
const listOfMovie = document.querySelector('.js-gallery');
const queryToGet = 'queue';

elBtnQueue.addEventListener('click', getQueueId);
const savedItems = JSON.parse(localStorage.getItem(queryToGet));

let cardOnPage = 18;
let countOfButtons = 0;
let buttons = [];
let dataMovies = [...savedItems];

function getQueueId() {
  listOfMovie.innerHTML = '';
  paginationPageList.innerHTML = '';
  onLoader();
  if (document.documentElement.clientWidth >= 769) {
    cardOnPage = 18;
    countOfButtons = createCountOfButtons(cardOnPage);
    createButtonsArray(countOfButtons);
    showPage(buttons[0]);
    renderPageOnButtonClick(buttons);
  } else if (
    document.documentElement.clientWidth < 769 &&
    document.documentElement.clientWidth > 468
  ) {
    cardOnPage = 2;
    countOfButtons = createCountOfButtons(cardOnPage);
    createButtonsArray(countOfButtons);
    showPage(buttons[0]);
    renderPageOnButtonClick(buttons);
  } else if (document.documentElement.clientWidth < 469) {
    cardOnPage = 1;
    countOfButtons = createCountOfButtons(cardOnPage);
    createButtonsArray(countOfButtons);
    showPage(buttons[0]);
    renderPageOnButtonClick(buttons);
  }
  stopLoader();
}

function createCountOfButtons(cardOnPage) {
  return Math.ceil(savedItems.length / cardOnPage);
}

function createButtonsArray(countOfButtons) {
  for (let i = 1; i <= countOfButtons; i += 1) {
    let paginationButton = document.createElement('li');
    paginationButton.innerHTML = i;
    paginationPageList.appendChild(paginationButton);
    buttons.push(paginationButton);
  }
  return buttons;
}

function renderPageOnButtonClick(buttons) {
  for (let button of buttons) {
    button.addEventListener('click', function () {
      showPage(this);
    });
  }
}

function createListMarkup(data) {
  for (let id of data) {
    fetchMovieDetails(id).then(movie => {
      listOfMovie.insertAdjacentHTML('afterbegin', libraryCardTpl(movie));
    });
  }
}

let showPage = (function () {
  let active;

  return function (item) {
    if (active) {
      active.classList.remove('active');
    }
    active = item;
    item.classList.add('active');
    let pageNum = +item.innerHTML;
    let start = (pageNum - 1) * cardOnPage;
    let end = start + cardOnPage;
    let renderDataMovies = dataMovies.slice(start, end);

    listOfMovie.innerHTML = '';
    createListMarkup(renderDataMovies);
  };
})();
