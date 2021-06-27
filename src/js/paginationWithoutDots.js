import { fetchMovieDetails } from './fetches/fetchRequests';
import libraryCardTpl from '../templates/library-card.hbs';

function createPaginationForLibrary(cardOnPage, movies) {
  const paginationPageList = document.querySelector('[data-library-pagination]');
  let buttons = [];
  let countOfButtons = createCountOfButtons(cardOnPage);
  createButtonsArray(countOfButtons);
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
      let renderDataMovies = movies.slice(start, end);

      document.querySelector('.js-gallery').innerHTML = '';
      createListMarkup(renderDataMovies);
    };
  })();
  showPage(buttons[0]);
  renderPageOnButtonClick(buttons);

  function createCountOfButtons(cardOnPage) {
    return Math.ceil(movies.length / cardOnPage);
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
        document
          .querySelector('.js-gallery')
          .insertAdjacentHTML('afterbegin', libraryCardTpl(movie));
      });
    }
  }
}

export default createPaginationForLibrary;
