import { fetchTrending, fetchSearchMovie, fetchMovieDetails } from './fetchRequests';
import renderPage from './pagination';
import cardTpl from '../templates/film-card.hbs';

const galerryContRef = document.querySelector('.js-gallery');
const qeryToGet = 'queue'

let query = '';
let numberOfPage = 1;
let totalMovies;

function getQueueId() {
    const savedItems = JSON.parse(localStorage.getItem(qeryToGet));

    savedItems.forEach(id => {

        fetchMovieDetails(id).then(data => {
            galerryContRef.innerHTML = cardTpl(data);
        })

    })
};

getQueueId()