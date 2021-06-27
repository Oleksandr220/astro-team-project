import cardTpl from '../templates/popular-film-section.hbs';
import * as res from './fetches/fetchRequests';
import * as apiFetchGenres from './fetches/fetchGenres';
import { API_KEY } from './objects/API_KEY';
import { onLoader, stopLoader } from './main/loader';
// import image from './deadpool.263c7d2b.png';
import image from '../images/deadpool.png';

const gallery = document.querySelector('.js-gallery');

let numberOfPage = 1;
let query = '';
let genresList;
apiFetchGenres.fetchMovieGenres().then(data => genresList = data.genres);

function createSectionTrending(key, page) {
  onLoader()
  res.fetchTrending(key, page).then(movies => {
    addedGenres(movies, genresList);
    gallery.innerHTML = cardTpl(movies.results);
    stopLoader()
  });
}

function createSectionSearch(key, page, query) {
  res.fetchSearchMovie(key, page, query).then(movies => {
    if (!movies.results.length) {
      console.log('alarm')
      gallery.innerHTML = `<img width="100%" src=${image}/>`;
      return
    }
    addedGenres(movies, genresList);
    gallery.innerHTML = cardTpl(movies.results);
    stopLoader()
  })
}

function addedGenres (movies, genresList) {
  if (movies.results[0] === undefined) {
    return;
  }
  for (let i = 0; i < 20; i += 1) {
    if (movies.results[i].genre_ids.length === 0) {
     return
    }
  const movieResult = movies.results[i].genre_ids;
    for (let j = 0; j < genresList.length; j += 1) {
      for (let g = 0; g < movieResult.length; g += 1) {
        if (genresList[j].id  === movieResult[g]) {
          movies.results[i].genre_ids[g] = ' ' + genresList[j].name;
        }
      }
    }
  }
}


function createPagination(totalMovies, startPage, query) {
  const paginationList = document.querySelector('#paginate');
  if (totalMovies < 1) {
    paginationList.classList.add('is-hidden');
  } else {
    paginationList.classList.remove('is-hidden');
  }
  numberOfPage = startPage;
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


