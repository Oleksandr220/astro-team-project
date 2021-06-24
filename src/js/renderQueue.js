import { fetchMovieDetails } from './fetchRequests';
import { onLoader, stopLoader } from './loader';
// import renderPage from './pagination';
import cardTpl from '../templates/film-card.hbs';


const elBtnQueue = document.querySelector('[data-queue-header');
const listOfMovie = document.querySelector('.js-gallery');
const qeryToGet = 'queue';

elBtnQueue.addEventListener('click', getQueueId)

function getQueueId() {
    const savedItems = JSON.parse(localStorage.getItem(qeryToGet));

    savedItems.forEach(id => {
        fetchMovieDetails(id).then(data => {
            onLoader()
            listOfMovie.innerHTML = cardTpl(data);
            stopLoader()
        })
    })
};