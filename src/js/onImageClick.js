import * as apiFetchRequest from './fetchRequests.js';
import imageCardsTpl from '../templates/filmCardDetail.hbs';


const listOfMovie = document.querySelector('.js-gallery');

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
  listOfMovie.removeEventListener('click', onDisplayBigImg);
}

function renderFilmCard(movie) {
  const markup = imageCardsTpl(movie);
  popUp.innerHTML = markup;
  popUp.classList.remove('visually-hiden');
  popUp.addEventListener('click', onCloseModal);
  window.addEventListener('keydown', onCloseModal);
}

function onCloseModal(e) {
  if(e.code === 'Escape' || e.target.dataset.popup === 'backdrop' || e.target.dataset.popup === 'close')
  popUp.classList.add('visually-hiden');
  popUp.innerHTML = '';
  popUp.removeEventListener('keydown', onCloseModal);
  window.removeEventListener('keydown', onCloseModal);
  listOfMovie.addEventListener('click', onDisplayBigImg);
}