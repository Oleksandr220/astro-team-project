const menuBtnReg = document.querySelector('[data-registration-button]');
const modalReg = document.querySelector('[data-modal-reg]');
console.log(modalReg);

const btnRegClose = document.querySelector('[data-reg-close]');
const regForm = document.querySelector('#reg-form');

console.log(regForm);

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
  const fireBaseKey = 'AIzaSyAQwNTK0lyyNa5eBMBZzViLjP2SCsqhR8E';
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${fireBaseKey}`, {
    method: 'POST',
    body: JSON.stringify({ email, password, returnSecureToken: true }),
    headers: {
      'Content-Type': 'applicatiom/json',
    },
  }).then(response => response.json().then(data => console.log(data)));
}

function RegFormHandler(event) {
  event.preventDefault();

  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;

  SignUpEmailAndPassword(email, password);
}
