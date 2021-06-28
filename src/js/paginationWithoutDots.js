import changePhoto from '../js/main/modalTeam';
import createPhotoTeamTPL from '../templates/teamPhoto.hbs';

function createPaginationForTeamWindow(cardOnPage, data) {
  const paginationPageList = document.querySelector('[data-modal-pagination]');
  paginationPageList.innerHTML = '';
  const paginationMobileList = document.querySelector('#paginate-teamModal');
  paginationMobileList.classList.add('is-hidden');
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
      let renderData = data.slice(start, end);

      document.querySelector('.modal-team-list').innerHTML = '';
      document
        .querySelector('.modal-team-list')
        .insertAdjacentHTML('beforeend', createListMarkup(renderData));
    };
  })();
  showPage(buttons[0]);
  renderPageOnButtonClick(buttons);

  function createCountOfButtons(cardOnPage) {
    return Math.ceil(data.length / cardOnPage);
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
        changePhoto();
      });
    }
  }

  function createListMarkup(teamRenderData) {
    return createPhotoTeamTPL(teamRenderData);
  }
}

export default createPaginationForTeamWindow;
