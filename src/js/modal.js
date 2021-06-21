import galleryModalMarksUp from '../templates/film-modal.hbs';

const modalEl = document.querySelector('.info-backdrop');

appendModalCard();

function appendModalCard() {
  modalEl.insertAdjacentHTML(
    'beforeend',
    createPicturesMarkup({
      poster_path: 'https://via.placeholder.com/240x356',
      title: 'title',
      vote_average: '7.3',
      vote_count: '1985',
      popularity: 'popularity',
      original_title: 'original_title',
      genres: [
        {
          id: '123',
          name: 'name',
        },
      ],
      overview:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium omnis nam excepturi blanditiis quaerat! Voluptatibus pariatur laboriosam ea facere, quae quidem nesciunt optio fugit ullam in repellendus quibusdam, qui sequi!',
    }),
  );
}

function createPicturesMarkup(film) {
  return galleryModalMarksUp(film);
}
