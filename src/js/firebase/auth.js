import { addQueueToLocalStorage, addWatchedToLocalStorage } from './getDataFromDb';

const menuBtnRef = document.querySelector('[data-auth-button]');

const modalAuth = document.querySelector('[data-modal-auth]');
const btnAuthClose = document.querySelector('[data-auth-close]');
const authForm = document.querySelector('#auth-form');

menuBtnRef.addEventListener('click', () => {
  modalAuth.classList.add('is-open');
  modalAuth.classList.remove('is-hidden');
});

btnAuthClose.addEventListener('click', () => {
  modalAuth.classList.remove('is-open');
  modalAuth.classList.add('is-hidden');
});

authForm.addEventListener('submit', authFormHandler);

function authWithEmailAndPassword(email, password) {
  const fireBaseKey = 'AIzaSyAQwNTK0lyyNa5eBMBZzViLjP2SCsqhR8E';
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${fireBaseKey}`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        'Content-Type': 'applicatiom/json',
      },
    },
  ).then(response => response.json());
}

function authFormHandler(event) {
  event.preventDefault();

  const email = event.target.querySelector('#email');
  const password = event.target.querySelector('#password');

  authWithEmailAndPassword(email.value, password.value).then(data => {
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    addWatchedToLocalStorage(data.localId).then(resp => {
      localStorage.setItem('watched', JSON.stringify(resp ? resp : []));
    });
    addQueueToLocalStorage(data.localId).then(resp => {
      localStorage.setItem('queue', JSON.stringify(resp ? resp : []));
    });
    email.value = '';
    password.value = '';
    modalAuth.classList.remove('is-open');
    modalAuth.classList.add('is-hidden');
  });
}

// authWithEmailAndPassword(email, password);

// import firebase from 'firebase';
// import firebaseui from 'firebaseui';

// // Initialize the FirebaseUI Widget using Firebase.

// const ui = new firebaseui.auth.AuthUI(firebase.auth());

// ui.start('#firebaseui-auth-container', {
//   signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
//   // Other config options...
// });

// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     {
//       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
//     },
//   ],
//   // Other config options...
// });

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyAQwNTK0lyyNa5eBMBZzViLjP2SCsqhR8E",
//     authDomain: "astroteam-project.firebaseapp.com",
//     projectId: "astroteam-project",
//     storageBucket: "astroteam-project.appspot.com",
//     messagingSenderId: "673025909562",
//     appId: "1:673025909562:web:d4ab6f72f0cea9f1e8a603",
//     measurementId: "G-57DDFV9TF9"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>
