const btnClearLibrary = document.querySelector('.js-gallery')
const libraryContRef = document.querySelector('.library-js')
const homeContRef = document.querySelector('.home-js')

libraryContRef.addEventListener('click', function () {
    btnClearLibrary.innerHTML = '<button class = "btn-clear">Clear library</button>';
})

homeContRef.addEventListener('click', function () {
    btnClearLibrary.style.display = 'none';
})