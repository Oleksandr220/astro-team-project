import teamAPI from './teamAPI.js';
import createTeamCardInModal from '../tamplete/createTeamCardInModal.hbs';

const openModalButton = document.querySelector('[data-team]');
const closeModalButton = document.querySelector('[data-modal-close]');
const modalBackdrop = document.querySelector('[data-modal]');
const modalContainer = document.querySelector('.modal-container');
const teamList = document.querySelector('.modal-team-list');

openModalButton.addEventListener('click', () => {
  modalBackdrop.classList.remove('is-hidden');
});

closeModalButton.addEventListener('click', () => {
  modalBackdrop.classList.add('is-hidden');
});

teamAPI.forEach(person => {
  console.log('person: ', person.name);
  teamList.innerHTML = createTeamCardInModal(person);
});
