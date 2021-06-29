let toTopBtn = document.querySelector('.to-up');
const changeStyleSvg = document.querySelector('.strelka-top-1');

window.onscroll = function () {
  if (window.pageYOffset > 200) {
    toTopBtn.style.display = 'block';
  } else {
    toTopBtn.style.display = 'none';
    changeStyleSvg.classList.remove('strelka-change');
  }
  console.log(window.onscroll);
};

// плавный скролл наверх
toTopBtn.addEventListener('click', function () {
  window.scrollBy({
    top: -document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
  changeStyleSvg.classList.add('strelka-change');
});
