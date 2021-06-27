import * as apiFetchRequest from '../fetches/fetchRequests';
import imageCardsTpl from '../../templates/filmCardDetail.hbs';
import image from '../../images/astro-team.png';

let itemsInWatched = JSON.parse(localStorage.getItem('watched'));
let itemsInQueue = JSON.parse(localStorage.getItem('queue'));

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
  const buttonWatched = document.querySelector('[data-watched]');
  const buttonQueue = document.querySelector('[data-queue]')
  const elementIdWatched = buttonWatched.dataset.id;
  const elementIdQueue = buttonWatched.dataset.id;

  if (itemsInWatched && itemsInWatched.includes(elementIdWatched) || itemsInQueue && itemsInQueue.includes(elementIdQueue)) {
    if (itemsInWatched && itemsInWatched.includes(elementIdWatched) && itemsInQueue && itemsInQueue.includes(elementIdQueue)) {
        buttonWatched.textContent = "DELETE FROM WATCHED"
        buttonQueue.textContent = "DELETE FROM QUEUE"
    }
    itemsInWatched && itemsInWatched.includes(elementIdWatched) ?
      buttonWatched.textContent = "DELETE FROM WATCHED"
      : buttonQueue.textContent = "DELETE FROM QUEUE"
  }
  popUp.classList.remove('visually-hiden');
  body.classList.add('modal-open');
  window.addEventListener('keydown', onEscPress);
  const closeBtn = document.querySelector('[data-popup="close"]');
  closeBtn.addEventListener('click', onCloseModal);

  const overleyEl = document.querySelector('.info-backdrop');
  overleyEl.addEventListener('click', onCloseModalOverlay);
  return
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
}

function onCloseModalOverlay(event) {
    if (event.target === event.currentTarget) {
        onCloseModal(event)
      }
}