import teamAPI from '../objects/teamAPI.json';
// import createTeamAnimationTPL from '../../templates/createTeamAnimation.hbs';
import createPhotoTeamTPL from '../../templates/teamPhoto.hbs';
import imageDanilo from '../../images/modalTeam/Danilo.jpg';
import imageBohdan from '../../images/modalTeam/Bohdan1.jpg';
import imageSvitlana from '../../images/modalTeam/Svitlana1.jpg';
import imageAlexandr from '../../images/modalTeam/Alexandr1.jpg';
import imageAleksey from '../../images/modalTeam/Aleksey1.jpg';
import imageVladislav from '../../images/modalTeam/Vladislav1.jpg';

const openModalButton = document.querySelector('[data-team]');
const modalBackdrop = document.querySelector('[data-modal]');
const teamList = document.querySelector('.modal-team-list');
const teamData = [...teamAPI];
const paginationMobileList = document.querySelector('#paginate-teamModal');
let teamRenderData = [];

openModalButton.addEventListener('click', () => {
  modalBackdrop.classList.remove('is-hidden');
  showPage;
  changePhoto();
  modalBackdrop.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModal);
});

function closeModal(e) {
  if (e.code === 'Escape' || e.target.dataset.modal === '' || e.target.dataset.modalClose === '') {
    modalBackdrop.classList.add('is-hidden');
    modalBackdrop.removeEventListener('keydown', closeModal);
    window.removeEventListener('keydown', closeModal);
  }
}

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
      changePhoto();
    });
  }
}

function createListMarkup(teamRenderData) {
  return createPhotoTeamTPL(teamRenderData);
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
  createTeamModalPagination();
}

// Create pagination on mobile window
function createTeamModalPagination() {
  if (document.documentElement.clientWidth < 469) {
    paginationMobileList.classList.remove('is-hidden');
  } else {
    paginationMobileList.classList.add('is-hidden');
  }
  let totalCards = 9;
  let perPage = 1;

  const state = {
    page: 1,
    perPage,
    totalPages: Math.ceil(totalCards / perPage),
    maxVisibleButtons: 3,
  };

  const html = {
    get(element) {
      return document.querySelector(element);
    },
  };

  const controls = {
    next() {
      state.page++;
      const lastPage = state.page > state.totalPages;
      if (lastPage) {
        state.page--;
      }
    },
    prev() {
      state.page--;
      if (state.page < 1) {
        state.page++;
      }
    },
    goto(page) {
      if (page < 1) {
        page = 1;
      }

      state.page = +page;

      if (page > state.totalPages) {
        state.page = state.totalPages;
      }
    },
    createListeners() {
      html.get('.first-teamModal').addEventListener('click', () => {
        controls.goto(1);
        update();
      });
      html.get('.last-teamModal').addEventListener('click', () => {
        controls.goto(state.totalPages);
        update();
      });
      html.get('.next-teamModal').addEventListener('click', () => {
        controls.next();
        update();
      });
      html.get('.prev-teamModal').addEventListener('click', () => {
        controls.prev();
        update();
      });
    },
  };

  const list = {
    update() {
      teamList.innerHTML = '';
      let page = state.page - 1;
      let start = page * state.perPage;
      let end = start + state.perPage;
      teamRenderData = teamData.slice(start, end);
      teamList.insertAdjacentHTML('beforeend', createListMarkup(teamRenderData));
    },
  };

  const buttons = {
    element: html.get('#paginate-teamModal .numbers-teamModal'),

    create(number) {
      const button = document.createElement('div');

      button.innerHTML = number;

      if (state.page == number) {
        button.classList.add('active');
      }

      button.addEventListener('click', event => {
        const page = event.target.innerText;
        controls.goto(page);
        update();
      });

      buttons.element.appendChild(button);
    },
    update() {
      buttons.element.innerHTML = '';
      const { maxLeft, maxRight } = buttons.calculateMaxVisible();

      for (let page = maxLeft; page <= maxRight; page++) {
        buttons.create(page);
      }
    },
    calculateMaxVisible() {
      const { maxVisibleButtons } = state;
      let maxLeft = state.page - Math.floor(maxVisibleButtons / 2);
      let maxRight = state.page + Math.floor(maxVisibleButtons / 2);

      if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = maxVisibleButtons;
      }

      if (maxRight > state.totalPages) {
        maxLeft = state.totalPages - (maxVisibleButtons - 1);
        maxRight = state.totalPages;

        if (maxLeft < 1) maxLeft = 1;
      }

      return { maxLeft, maxRight };
    },
  };

  function update() {
    list.update();
    buttons.update();
  }

  function init() {
    update();
    controls.createListeners();
  }

  init();
}

// Change img src
function changePhoto() {
  const photoElements = document.querySelectorAll('figure img');
  for (const elem of photoElements) {
    console.log('altElement: ', elem.alt);
    if (elem.alt === 'Danilo') {
      elem.src = `${imageDanilo}`;
    }
    if (elem.alt === 'Bohdan') {
      elem.src = `${imageBohdan}`;
    }
    if (elem.alt === 'Svitlana') {
      console.log('elem.alt: ', elem.alt);
      elem.src = `${imageSvitlana}`;
    }
    if (elem.alt === 'Alexandr') {
      elem.src = `${imageAlexandr}`;
    }
    if (elem.alt === 'Aleksey') {
      elem.src = `${imageAleksey}`;
    }
    if (elem.alt === 'Vladislav') {
      elem.src = `${imageVladislav}`;
    }
  }
}
