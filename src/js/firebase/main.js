import { addQueueToLocalStorage, addWatchedToLocalStorage } from './getDataFromDb';
const menuBtnReg = document.querySelector('[data-registration-button]');
const menuBtnRef = document.querySelector('[data-auth-button]');

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
