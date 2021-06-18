import * as apiFetchRequest from './fetchRequests';

const userKey = '1ca3db2e1e1b7285b1391876caf4be93';
const movieId = '10580';


function onImageClicked(id, key) {
apiFetchRequest.fetchMovieDetails(id, key)
    // .then(movie => {
    //     console.log('test',movie)
    // })
}
onImageClicked(movieId, userKey)

function onDisplayBigImg(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  console.log(e.target.dataset.lightbox);
  const instance = basicLightbox.create(`
    <img src="${e.target.dataset.lightbox}" alt="${e.target.alt}">
`);
  instance.show();
  return;
}