import * as apiFetchRequest from './fetchRequests.js';
import imageCardsTpl from '../templates/filmCardDetail.hbs';


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
  const getIdFromImg = e.target.dataset.action;
  const getMediaType = e.target.dataset.type;
  
  fetchMovieById(getIdFromImg, getMediaType);
}

function renderFilmCard(movie) {
  const markup = imageCardsTpl(movie);
  popUp.innerHTML = markup;
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

function onCloseModal() {
  popUp.classList.add('visually-hiden');
  body.classList.remove('modal-open');
  popUp.innerHTML = '';
  closeBtn.removeEventListener('click', onCloseModal);
  window.removeEventListener('keydown', onCloseModal);
}