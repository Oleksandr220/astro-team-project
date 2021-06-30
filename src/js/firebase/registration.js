import { openModalauth, logOut } from './auth';

const menuBtnReg = document.querySelector('[data-registration-button]');
const modalReg = document.querySelector('[data-modal-reg]');
const menuBtnRef = document.querySelector('[data-auth-button]');
const btnRegClose = document.querySelector('[data-reg-close]');
const regForm = document.querySelector('#reg-form');
const ErrorMessageEl = document.querySelector('.error-message-reg');

menuBtnReg.addEventListener('click', () => {
  modalReg.classList.add('is-open');
  modalReg.classList.remove('is-hidden');
});

btnRegClose.addEventListener('click', () => {
  modalReg.classList.remove('is-open');
  modalReg.classList.add('is-hidden');
});

regForm.addEventListener('submit', RegFormHandler);

function SignUpEmailAndPassword(email, password) {
  const fireBaseKey = 'AIzaSyAOhjczYQKwysy9Aip6uCwpuH9UbHQ7AR4';
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${fireBaseKey}`, {
    method: 'POST',
    body: JSON.stringify({ email, password, returnSecureToken: true }),
    headers: {
      'Content-Type': 'applicatiom/json',
    },
  }).then(response => {
    if (!response.ok) {
      throw Error();
    }
    return response.json();
  });
}

function RegFormHandler(event) {
  event.preventDefault();

  const email = event.target.querySelector('#email');
  const password = event.target.querySelector('#password');

  SignUpEmailAndPassword(email.value, password.value)
    .then(data => {
      menuBtnReg.classList.add('is-hidden');
      menuBtnRef.removeEventListener('click', openModalauth);
      menuBtnRef.innerHTML = 'log out';
      menuBtnRef.addEventListener('click', logOut);
      localStorage.setItem('token', data.idToken);
      localStorage.setItem('userId', data.localId);
      localStorage.removeItem('watched');
      localStorage.removeItem('queue');
      email.value = '';
      password.value = '';
      modalReg.classList.remove('is-open');
      modalReg.classList.add('is-hidden');
      ErrorMessageEl.classList.add('is-hidden');
      window.location.replace('/');
    })
    .catch(() => {
      ErrorMessageEl.classList.remove('is-hidden');
    });
}
