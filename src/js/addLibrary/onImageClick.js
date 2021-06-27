import * as apiFetchRequest from '../fetches/fetchRequests';
import imageCardsTpl from '../../templates/filmCardDetail.hbs';
import image from '../../images/astro-team.png';
import { saveToDb, deleteFromDb } from '../firebase/addToDbWatched.js';

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
  const itemsInWatched = JSON.parse(localStorage.getItem('watched'));
  const itemsInQueue = JSON.parse(localStorage.getItem('queue'));

  const markup = imageCardsTpl(movie);
  popUp.innerHTML = markup;
  if (!movie.poster_path) {
    document.querySelector('.modal-image').src = `${image}`;
  }
  const buttonWatched = document.querySelector('[data-watched]');
  const buttonQueue = document.querySelector('[data-queue]');
  const elementIdWatched = buttonWatched.dataset.id;
  const elementIdQueue = buttonQueue.dataset.id;

  const isWatched = itemsInWatched?.includes(elementIdWatched);
  const isQueue = itemsInQueue?.includes(elementIdQueue);

  if (isWatched) {
    buttonWatched.textContent = 'DELETE FROM WATCHED';
    deleteFromDb(buttonWatched);
  } else {
    saveToDb(buttonWatched);
  }

  if (isQueue) {
    buttonQueue.textContent = 'DELETE FROM QUEUE';
    deleteFromDb(buttonQueue);
  } else {
    saveToDb(buttonQueue);
  }

  popUp.classList.remove('visually-hiden');
  body.classList.add('modal-open');
  window.addEventListener('keydown', onEscPress);
  const closeBtn = document.querySelector('[data-popup="close"]');
  closeBtn.addEventListener('click', onCloseModal);

  return;
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
}
