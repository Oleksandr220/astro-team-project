import { addQueueToLocalStorage, addWatchedToLocalStorage } from './getDataFromDb';

const menuBtnRef = document.querySelector('[data-auth-button]');
const menuBtnReg = document.querySelector('[data-registration-button]');
const ErrorMessageEl = document.querySelector('.error-message');

const modalAuth = document.querySelector('[data-modal-auth]');
const btnAuthClose = document.querySelector('[data-auth-close]');
const authForm = document.querySelector('#auth-form');

export function openModalauth() {
  modalAuth.classList.add('is-open');
  modalAuth.classList.remove('is-hidden');
}

const key = localStorage.getItem('userId');

if (key) {
  menuBtnRef.addEventListener('click', logOut);
  menuBtnReg.classList.add('is-hidden');
  menuBtnRef.innerHTML = 'log out';
} else {
  menuBtnRef.addEventListener('click', openModalauth);
}

btnAuthClose.addEventListener('click', () => {
  modalAuth.classList.remove('is-open');
  modalAuth.classList.add('is-hidden');
});

authForm.addEventListener('submit', authFormHandler);

function authWithEmailAndPassword(email, password) {
  const fireBaseKey = 'AIzaSyAOhjczYQKwysy9Aip6uCwpuH9UbHQ7AR4';
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${fireBaseKey}`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        'Content-Type': 'applicatiom/json',
      },
    },
  ).then(response => {
    if (!response.ok) {
      throw Error();
    }
    return response.json();
  });
}

function authFormHandler(event) {
  event.preventDefault();

  const email = event.target.querySelector('#email-auth');
  const password = event.target.querySelector('#password-auth');

  authWithEmailAndPassword(email.value, password.value)
    .then(data => {
      localStorage.setItem('token', data.idToken);
      localStorage.setItem('userId', data.localId);
      menuBtnReg.classList.add('is-hidden');

      menuBtnRef.removeEventListener('click', openModalauth);
      menuBtnRef.innerHTML = 'log out';
      menuBtnRef.addEventListener('click', logOut);

      addWatchedToLocalStorage(data.localId)
        .then(resp => {
          localStorage.setItem('watched', JSON.stringify(resp ? resp : []));
        })
        .then(() => {
          addQueueToLocalStorage(data.localId).then(resp => {
            localStorage.setItem('queue', JSON.stringify(resp ? resp : []));
          });
        })
        .then(() => {
          setTimeout(() => {
            window.location.replace('/astro-team-project/');
          }, 100);
        });

      email.value = '';
      password.value = '';
      modalAuth.classList.remove('is-open');
      modalAuth.classList.add('is-hidden');
      ErrorMessageEl.classList.add('is-hidden');
    })
    .catch(() => {
      ErrorMessageEl.classList.remove('is-hidden');
    });
}

export function logOut() {
  localStorage.removeItem('watched');
  localStorage.removeItem('queue');
  localStorage.removeItem('userId');
  localStorage.removeItem('token');

  menuBtnReg.classList.remove('is-hidden');

  menuBtnRef.removeEventListener('click', logOut);
  menuBtnRef.innerHTML = 'Sign In';
  menuBtnRef.addEventListener('click', openModalauth);
  window.location.replace('/astro-team-project/');
}
