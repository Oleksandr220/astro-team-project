import * as apiFetchRequest from './fetchRequests.js';
import imageCardsTpl from '../templates/filmCardDetail.hbs';
import image from '../images/astro-team.png';

const listOfMovie = document.querySelector('.js-gallery');
const body = document.querySelector('body');
const popUp = document.querySelector('[data-popup="backdrop"]');

listOfMovie.addEventListener('click', onDisplayBigImg);

function fetchMovieById(id, type) {
  apiFetchRequest.fetchMovieDetails(id, type).then(movie => {
    const markup = renderFilmCard(movie);
    return markup;
  });
}

function onDisplayBigImg(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const getIdFromImg = e.target.dataset.id;
  fetchMovieById(getIdFromImg);
}

function renderFilmCard(movie) {
  const markup = imageCardsTpl(movie);
  popUp.innerHTML = markup;
  if (!movie.poster_path) {
    document.querySelector('.modal-image').src = `${image}`;
  }
  popUp.classList.remove('visually-hiden');
  body.classList.add('modal-open');
  window.addEventListener('keydown', onEscPress);
  const closeBtn = document.querySelector('[data-popup="close"]');
  closeBtn.addEventListener('click', onCloseModal);

}

function onEscPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function onCloseModal(e) {
  popUp.classList.add('visually-hiden');
  body.classList.remove('modal-open');
  popUp.innerHTML = '';
  e.stopPropagation()
  // closeBtn.removeEventListener('click', onCloseModal);
  // window.removeEventListener('keydown', onCloseModal);
}