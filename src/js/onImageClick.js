import * as apiFetchRequest from './fetchRequests.js';
import imageCardsTpl from '../templates/filmCardDetail.hbs';

const body = document.querySelector('.card__list');
const popUp = document.querySelector('[data-popup="backdrop"]');

body.addEventListener('click', onDisplayBigImg);

function fetchMovieById(id, type) {
  apiFetchRequest.fetchMovieDetails(id, type).then(movie => {
    const markup = renderFilmCard(movie);
    return markup;
  });
}

function onDisplayBigImg(e) {
  console.log(e.target)
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const getIdFromImg = e.target.dataset.action;
  const getMediaType = e.target.dataset.type;
    fetchMovieById(getIdFromImg, getMediaType);
    body.removeEventListener('click', onDisplayBigImg);
}

function renderFilmCard(movie) {
  const markup = imageCardsTpl(movie);
  popUp.innerHTML = markup;
  const buttonCloseModal = document.querySelector('[data-close]');

  window.addEventListener('keydown', onEscButtonPress);
  popUp.classList.remove('visually-hidden');
  buttonCloseModal.addEventListener('click', onCloseModal);
}

function onEscButtonPress(evt) {
  if (evt.code === 'Escape') {
    onCloseModal();
  }
}

function onCloseModal() {
  popUp.classList.add('visually-hidden');
  popUp.innerHTML = '';
    window.removeEventListener('keydown', onEscButtonPress);
    body.addEventListener('click', onDisplayBigImg);
}