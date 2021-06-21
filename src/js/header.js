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

// Add to queue

const addToQueueBtnRef = document.querySelector('[data-popup="backdrop"]')

addToQueueBtnRef.addEventListener('click', onQueueClick);

let itemsInQueue = JSON.parse(localStorage.getItem('queue'));

if (JSON.parse(localStorage.getItem('queue')) === null) {
    itemsInQueue = [];
} else {
    itemsInQueue = JSON.parse(localStorage.getItem('queue'))
};


function onQueueClick(e) {
    const buttonQueue = document.querySelector('[data-queue]')
    const elementId = buttonQueue.dataset.id;
    const genreId = buttonQueue.dataset.genresid;

    if (e.target !== buttonQueue) {
        return;
    }

    itemsInQueue.push(elementId)
    const uniqueItems = unique(itemsInQueue);
    localStorage.setItem('queue', JSON.stringify(uniqueItems));

};

function unique(idItems) {
    let result = [];

    for (const id of idItems) {
        if (!result.includes(id)) {
            result.push(id);
        }
    }

    return result;
}


console.log(JSON.parse(localStorage.getItem('queue')));