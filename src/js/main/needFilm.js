const hideForm = document.querySelector('.hide-form');
const orderTicket = document.querySelector('.order-ticket');
const orderTrigger = document.querySelector('.order-trigger');
const orderTicketForm = document.querySelector('.order-ticket__form');
const closeCross = document.querySelector('[data-modal-need-film]');

const orderTicketFormWrapper = document.querySelector('.order-ticket__form-wrapper');
const orderTicketPreloaderWrapper = document.querySelector('.order-ticket__preloader-wrapper');
const orderTicketThanksWrapper = document.querySelector('.order-ticket__thanks-wrapper');
const orderTicketThanksName = document.querySelector('.order-ticket__thanks-name');

setTimeout(() => {
  const heightForm = orderTicket.offsetHeight;
  hideForm.style.bottom = -heightForm + 'px';
  orderTicket.style.height = heightForm + 'px';
}, 3000);

function sendData(data, callback, callBefore) {
  if (callBefore) callBefore();

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(callback);
}

function showPreloader() {
  
  orderTicketFormWrapper.style.display = 'none';
  orderTicketPreloaderWrapper.style.display = 'block';
  
}

function showThankYou(data) {
  orderTicketFormWrapper.style.display = 'none';
  orderTicketPreloaderWrapper.style.display = 'none';
  orderTicketThanksWrapper.style.display = 'block';
  orderTicketThanksName.textContent = data.name;
  setTimeout(closeOrOpenForm, 4000);
  setTimeout(reLoadForm, 5000);
}

function changeLayoutLabel(e) {
  const target = e.target;
  const label = target.labels[0];
  if (label && target.value) {
    label.classList.add('order-ticket__label-focus');
  } else {
    label.classList.remove('order-ticket__label-focus');
  }
}

function submitForm(e) {
  e.preventDefault();

  const formData = new FormData(orderTicketForm);

  const data = {};

  for (const [name, value] of formData) {
    data[name] = value;
  }

  sendData(data, showThankYou, showPreloader);
}

function closeOrOpenForm() {
  hideForm.classList.toggle('hide-form-active');
  closeCross.classList.toggle('is-hidden');
}

function reLoadForm() {
  orderTicketFormWrapper.style.display = 'flex';
  orderTicketThanksWrapper.style.display = 'none';
  orderTicketForm.reset();
  const arrayOfLabel = orderTicketForm.querySelectorAll('label');
  arrayOfLabel.forEach(label => label.classList.remove('order-ticket__label-focus'));
}

orderTrigger.addEventListener('click', closeOrOpenForm);

orderTicketForm.addEventListener('change', changeLayoutLabel);

orderTicketForm.addEventListener('submit', submitForm);
