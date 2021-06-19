const homePageRef = document.querySelector('.home-js');
const libraryPageRef = document.querySelector('.library-js');
const containerInHeader = document.querySelector('.cont-header-js');
const buttonsLibraryRef = document.querySelector('.buttons-js');
const formToSearchRef = document.querySelector('.form-js');


homePageRef.addEventListener('click', onHomeClick);
libraryPageRef.addEventListener('click', onLibraryClick);

function onHomeClick(e) {
    e.target.classList.add('logo-current');
    containerInHeader.classList.remove('cont-header-library');
    containerInHeader.style.paddingBottom = '95px';
    buttonsLibraryRef.classList.add('visually-hiden');
    formToSearchRef.classList.remove('visually-hiden')
    libraryPageRef.classList.remove('logo-current');

};

function onLibraryClick(e) {
    e.target.classList.add('logo-current');
    containerInHeader.classList.add('cont-header-library');
    containerInHeader.style.paddingBottom = '75px';
    buttonsLibraryRef.classList.remove('visually-hiden');
    formToSearchRef.classList.add('visually-hiden');
    homePageRef.classList.remove('logo-current');


};