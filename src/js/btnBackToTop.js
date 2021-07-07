let toTopBtn = document.querySelector('.to-up');
const changeStyleSvg = document.querySelector('.strelka-top-1');
const hideForm = document.querySelector('.hide-form');
const orderTrigger = document.querySelector('.order-trigger');

window.onscroll = function () {
  if (window.pageYOffset > 200) {
    toTopBtn.style.display = 'block';
  } else {
    toTopBtn.style.display = 'none';
    changeStyleSvg.classList.remove('strelka-change');
  }
};

orderTrigger.addEventListener('click', closeFormAndDisableBtn);

function closeFormAndDisableBtn() {
  if (
    document.documentElement.clientWidth < 469 &&
    hideForm.classList.contains('hide-form-active')
  ) {
    toTopBtn.style.display = 'none';
  } else {
    if (window.pageYOffset > 200) toTopBtn.style.display = 'block';
  }
}

// плавный скролл наверх
toTopBtn.addEventListener('click', function () {
  window.scrollBy({
    top: -document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
  changeStyleSvg.classList.add('strelka-change');
});
