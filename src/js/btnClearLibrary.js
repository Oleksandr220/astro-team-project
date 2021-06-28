const gallerySectionEl = document.querySelector('.js-gallery');
const libraryContRef = document.querySelector('.library-js');
const homeContRef = document.querySelector('.home-js');
const btnClearLibraryEl = document.querySelector('.btn-clear');
const btnWatchedEl = document.querySelector('[data-watched-header');
const btnQueueEl = document.querySelector('[data-queue-header');

// Add and remove button
function addBtnClearLibrary() {
    btnClearLibraryEl.classList.remove('is-hidden');
}

function removeBtnClearLibrary() {
    btnClearLibraryEl.classList.add('is-hidden');
}

libraryContRef.addEventListener('click', addBtnClearLibrary)
homeContRef.addEventListener('click', removeBtnClearLibrary)

// Function button

function clearWatchedLib() {
    localStorage.removeItem('watched');
}

function clearQueueLib() {
    localStorage.removeItem('queue');
}

function clearGallery() {
    gallerySectionEl.innerHTML = '';
}

function clearLib () {
    clearGallery();
    let declOfMovie = 1;
    if (btnWatchedEl.classList.contains('library-button-focus')) {
        clearWatchedLib();
    }
    if (btnQueueEl.classList.contains('library-button-focus')) {
        clearQueueLib()
    }
}

btnClearLibraryEl.addEventListener('click', clearLib)