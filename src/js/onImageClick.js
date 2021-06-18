import * as apiFetchRequest from './fetchRequests.js';
import imageCardsTpl from '../templates/filmCard.hbs';

const userKey = '1ca3db2e1e1b7285b1391876caf4be93';
// const movieId = '10580';

const body = document.querySelector('body');
const popUp = document.querySelector('#do');

body.addEventListener('click', onDisplayBigImg);

function fetchMovieById(id, key) {
apiFetchRequest.fetchMovieDetails(id, key)
    .then(movie => {
        const markup = renderFilmCard(movie);
        return markup;
    })
}

function onDisplayBigImg(e) {
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    let idFromImg = e.target.id;
    fetchMovieById(idFromImg, userKey);
}

function renderFilmCard(movie) {
    //   if (!movie.poster_path) {
    //     movie.poster_path = "/"
    
    //   }
    const markup = imageCardsTpl(movie);
    return (popUp.innerHTML = markup);
}