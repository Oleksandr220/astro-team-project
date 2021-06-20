import cardTpl from '../templates/film-card.hbs';
import { getTrendingSection, getSearchSection, getDetailsCard } from './main';

const refs = {
  galleryRef: document.querySelector('.js-gallery'),
};

function renderSection(card) {
  const markupCard = cardTpl(card);
  refs.galleryRef.innerHTML = markupCard;
}

export default renderSection;
