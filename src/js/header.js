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
  e.target.classList.add('logo-current');
  paginationList.classList.remove('is-hidden');
  containerInHeader.classList.remove('cont-header-library');
  containerInHeader.style.paddingBottom = '95px';
  buttonsLibraryRef.classList.add('visually-hiden');
  formToSearchRef.classList.remove('visually-hiden');
  boxForInputRef.classList.remove('visually-hiden');
  libraryPageRef.classList.remove('logo-current');
}

function onLibraryClick(e) {
  galerryContRef.innerHTML = ' ';
  paginationList.classList.add('is-hidden');
  e.target.classList.add('logo-current');
  containerInHeader.classList.add('cont-header-library');
  containerInHeader.style.paddingBottom = '75px';
  buttonsLibraryRef.classList.remove('visually-hiden');
  formToSearchRef.classList.add('visually-hiden');
  boxForInputRef.classList.add('visually-hiden');
  homePageRef.classList.remove('logo-current');
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
