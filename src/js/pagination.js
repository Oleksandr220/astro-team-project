import cardTpl from '../templates/film-card.hbs';
import * as res from './fetchRequests.js';
import { API_KEY } from './API_KEY';
import {onLoader, stopLoader} from './loader'
const gallery = document.querySelector('.js-gallery');
let numberOfPage = 1;
let query = '';
// let totalMovies = 20;

function createSectionTrending(key, page) {
  onLoader()
  res.fetchTrending(key, page).then(movies => {
    console.log('movies in trending: ', movies);
    gallery.innerHTML = cardTpl(movies.results);
    stopLoader()
  });
}

function createSectionSearch(key, page, query) {
  console.log('query: ', query);
  onLoader()
  res.fetchSearchMovie(key, page, query).then(movies => {
    console.log('movies in search: ', movies);
    gallery.innerHTML = cardTpl(movies.results);
    stopLoader()
  })
}

function createPagination(totalMovies, query) {
  console.log('query: ', query);
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
      if (query) {
        html.get('.js-gallery').innerHTML = createSectionSearch(API_KEY, numberOfPage, query);
      } else {
        html.get('.js-gallery').innerHTML = createSectionTrending(API_KEY, numberOfPage);
      }
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

export default createPagination;
