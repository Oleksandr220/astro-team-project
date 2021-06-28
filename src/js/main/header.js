import { renderQueueList } from '../renderQueue';
import { renderWatchedList } from '../renderWatched';

const homePageRef = document.querySelector('.home-js');
const libraryPageRef = document.querySelector('.library-js');
const containerInHeader = document.querySelector('.cont-header-js');
const buttonsLibraryRef = document.querySelector('.buttons-js');
const formToSearchRef = document.querySelector('.form-js');
const boxForInputRef = document.querySelector('.box-js');
const galerryContRef = document.querySelector('.js-gallery');
const paginationList = document.querySelector('#paginate');

homePageRef.addEventListener('click', onHomeClick);
libraryPageRef.addEventListener('click', onLibraryClick);

function onHomeClick(e) {
  paginationList.classList.remove('is-hidden');
  e.target.classList.add('logo-current');
  containerInHeader.classList.remove('cont-header-library');
  containerInHeader.style.paddingBottom = '95px';
  buttonsLibraryRef.classList.add('visually-hiden');
  formToSearchRef.classList.remove('visually-hiden');
  boxForInputRef.classList.remove('visually-hiden');
  libraryPageRef.classList.remove('logo-current');
}

function declOfMovie(number) {
  const words = ['movie', 'movies']
  return words[number < 2 ? 0 : 1];
}

function onLibraryClick(e) {
  galerryContRef.style.marginTop = '60px';
  let itemsInQueue = JSON.parse(localStorage.getItem('queue'));
  let itemsInWatched = JSON.parse(localStorage.getItem('watched'));
  if (itemsInQueue && itemsInWatched) {
    galerryContRef.innerHTML = `<h2 class="modal-title">${itemsInWatched.length} ${declOfMovie(
      itemsInWatched.length)} in Watched List / ${itemsInQueue.length} ${declOfMovie(itemsInQueue.length)} in Queue List</h2>`;
  } else if (itemsInQueue) {
    galerryContRef.innerHTML = `<h2 class="modal-title">0 movies in Watched List / ${itemsInQueue.length} ${declOfMovie(itemsInQueue.length)} in Queue List<h2 class="modal-title">`;
  } else if (itemsInWatched) {
    galerryContRef.innerHTML = `<h2 class="modal-title">${itemsInWatched.length} ${declOfMovie(itemsInWatched.length)} in Watched List / 0 movies in Queue List<h2 class="modal-title">`;
  }
  // paginationList.classList.add('is-hidden');
  document.getElementById('pagination').innerHTML = '';
  e.target.classList.add('logo-current');
  containerInHeader.classList.add('cont-header-library');
  containerInHeader.style.paddingBottom = '75px';
  buttonsLibraryRef.classList.remove('visually-hiden');
  formToSearchRef.classList.add('visually-hiden');
  boxForInputRef.classList.add('visually-hiden');
  homePageRef.classList.remove('logo-current');

  const elBtnWatched = document.querySelector('[data-watched-header');
  elBtnWatched.addEventListener('click', renderWatchedList);
  const elBtnQueue = document.querySelector('[data-queue-header');
  elBtnQueue.addEventListener('click', renderQueueList);
}

//Queue current

const buttonQueueHeaderRef = document.querySelector('[data-queue-header]');
const buttonWatchedHeaderRef = document.querySelector('[data-watched-header]');

buttonQueueHeaderRef.addEventListener('click', onQueueHeaderClick);
buttonWatchedHeaderRef.addEventListener('click', onWatchedHeaderClick);

function onQueueHeaderClick(e) {
  e.target.classList.add('library-button-focus');
  buttonWatchedHeaderRef.classList.remove('library-button-focus');
}

function onWatchedHeaderClick(e) {
  e.target.classList.add('library-button-focus');
  buttonQueueHeaderRef.classList.remove('library-button-focus');
}

//Loap active
const inputToSearchRef = document.querySelector('[data-input]');
const loapIninputRef = document.querySelector('[data-loap]');

window.addEventListener('click', onInputClick);

function onInputClick(e) {
  if (e.target === inputToSearchRef) {
    loapIninputRef.classList.add('search-loap-active');
  } else {
    loapIninputRef.classList.remove('search-loap-active');
  }
}
