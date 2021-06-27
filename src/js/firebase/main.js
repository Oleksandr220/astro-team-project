import { addQueueToLocalStorage, addWatchedToLocalStorage } from './getDataFromDb';

window.addEventListener('load', () => {
  const key = localStorage.getItem('userId');
  if (key) {
    addWatchedToLocalStorage(key).then(resp => {
      localStorage.setItem('watched', JSON.stringify(resp ? resp : []));
    });
    addQueueToLocalStorage(key).then(resp => {
      localStorage.setItem('queue', JSON.stringify(resp ? resp : []));
    });
  }
});
