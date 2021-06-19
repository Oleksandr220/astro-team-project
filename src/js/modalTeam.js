import teamAPI from './teamAPI.json';
// import createTeamCardInModalTPL from '../tamplete/createTeamCardInModal.hbs';
import createTeamAnimationTPL from '../tamplete/createTeamAnimation.hbs';

const openModalButton = document.querySelector('[data-team]');
const closeModalButton = document.querySelector('[data-modal-close]');
const modalBackdrop = document.querySelector('[data-modal]');
const teamList = document.querySelector('.modal-team-list');
const teamData = [...teamAPI];
let teamRenderData = [];

openModalButton.addEventListener('click', () => {
  modalBackdrop.classList.remove('is-hidden');
});

closeModalButton.addEventListener('click', () => {
  modalBackdrop.classList.add('is-hidden');
});

// Create Pagination
const paginationList = document.querySelector('[data-modal-pagination]');
let cardOnPage = 0;
let countOfButtons = 0;
let buttons = [];

function createCountOfButtons(cardOnPage) {
  return Math.ceil(teamData.length / cardOnPage);
}

function createButtonsArray(countOfButtons) {
  for (let i = 1; i <= countOfButtons; i += 1) {
    let paginationButton = document.createElement('li');
    paginationButton.innerHTML = i;
    paginationList.appendChild(paginationButton);
    buttons.push(paginationButton);
  }
  return buttons;
}

function renderTeamListOnButtonClick(buttons) {
  for (let button of buttons) {
    button.addEventListener('click', function () {
      showPage(this);
    });
  }
}

function createListMarkup(teamRenderData) {
  return createTeamAnimationTPL(teamRenderData);
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
    teamRenderData = teamData.slice(start, end);

    teamList.innerHTML = '';
    teamList.insertAdjacentHTML('beforeend', createListMarkup(teamRenderData));
  };
})();

if (document.documentElement.clientWidth >= 769) {
  cardOnPage = 3;
  countOfButtons = createCountOfButtons(cardOnPage);
  createButtonsArray(countOfButtons);
  showPage(buttons[0]);
  renderTeamListOnButtonClick(buttons);
} else if (
  document.documentElement.clientWidth < 769 &&
  document.documentElement.clientWidth > 468
) {
  cardOnPage = 2;
  countOfButtons = createCountOfButtons(cardOnPage);
  createButtonsArray(countOfButtons);
  showPage(buttons[0]);
  renderTeamListOnButtonClick(buttons);
} else if (document.documentElement.clientWidth < 469) {
  cardOnPage = 1;
  countOfButtons = createCountOfButtons(cardOnPage);
  createButtonsArray(countOfButtons);
  showPage(buttons[0]);
  renderTeamListOnButtonClick(buttons);
}
