import cardTpl from '../templates/film-card.hbs';
import * as res from './fetchRequests.js';

const gallery = document.querySelector('.js-gallery');
const userKey = '1ca3db2e1e1b7285b1391876caf4be93';
let numberOfPage = 1;
let totalMovies = 20;

function renderPage(card) {
  return cardTpl(card);
}

function createSection(key, page) {
  res.fetchTrending(userKey, numberOfPage).then(movies => {
    gallery.innerHTML = renderPage(movies.results);
  });
}

res.fetchTrending(userKey, numberOfPage).then(movies => {
  totalMovies = movies.total_results;
  createPagination(totalMovies);
});

function createPagination(totalMovies) {
  let perPage = 20;

  const state = {
    page: 1,
    perPage,
    totalPages: Math.ceil(totalMovies / perPage),
    maxVisibleButtons: 5,
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
      numberOfPage = state.page;
    },
    prev() {
      state.page--;
      if (state.page < 1) {
        state.page++;
      }
      numberOfPage = state.page;
    },
    goto(page) {
      if (page < 1) {
        page = 1;
      }

      state.page = +page;
      numberOfPage = state.page;

      if (page > state.totalPages) {
        state.page = state.totalPages;
        numberOfPage = state.page;
      }
    },
    createListeners() {
      html.get('.first').addEventListener('click', () => {
        controls.goto(1);
        update();
      });
      html.get('.last').addEventListener('click', () => {
        controls.goto(state.totalPages);
        update();
      });
      html.get('.next').addEventListener('click', () => {
        controls.next();
        update();
      });
      html.get('.prev').addEventListener('click', () => {
        controls.prev();
        update();
      });
    },
  };

  const list = {
    update() {
      html.get('.js-gallery').innerHTML = createSection(userKey, numberOfPage);
    },
  };

  const buttons = {
    element: html.get('#paginate .numbers'),

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
