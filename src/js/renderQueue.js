<<<<<<< HEAD
import { fetchMovieDetails } from './fetchRequests';
import { onLoader, stopLoader } from './loader';
import cardTmpl from '../templates/film-card.hbs';
=======
import { fetchTrending, fetchSearchMovie, fetchMovieDetails } from './fetchRequests';
import renderPage from './pagination';
import cardTpl from '../templates/film-card.hbs';
>>>>>>> header

const elBtnQueue = document.querySelector('[data-queue-header');
const listOfMovie = document.querySelector('.js-gallery');
const qeryToGet = 'queue';

elBtnQueue.addEventListener('click', getQueueId)

function getQueueId() {
    const savedItems = JSON.parse(localStorage.getItem(qeryToGet));

    savedItems.forEach(id => {
<<<<<<< HEAD
        fetchMovieDetails(id).then(movie => {
            console.log(movie)
            onLoader()
            listOfMovie.innerHTML = cardTmpl(movie);
            stopLoader()
        })
=======

        fetchMovieDetails(id).then(data => {
            galerryContRef.innerHTML = cardTpl(data);
        })

>>>>>>> header
    })
};