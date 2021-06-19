import cardTpl from '../templates/film-card.hbs';
import { fetchTrending, fetchSearchMovie } from './main';

const refs = {
    galleryRef: document.querySelector('.js-gallery'),  
}

function imagesMarkup (card) {
    refs.galleryRef.insertAdjacentHTML('beforeend', cardTpl(card));
}
console.log(fetchTrending)