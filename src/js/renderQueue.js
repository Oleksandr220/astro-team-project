import { fetchTrending, fetchSearchMovie, fetchMovieDetails } from './fetchRequests';
import renderPage from './pagination';

const galerryContRef = document.querySelector('.js-gallery');
const qeryToGet = 'queue'

let query = '';
let numberOfPage = 1;
let totalMovies;

function getQueueId() {
    const savedItems = JSON.parse(localStorage.getItem(qeryToGet));

    savedItems.forEach(id => {
        fetchMovieDetails(id).then(console.log)
    })
};

getQueueId()