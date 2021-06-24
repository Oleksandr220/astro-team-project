const btnClearLibrary = document.querySelector('.gallery-section')
const libraryContRef = document.querySelector('.library-js')
const homeContRef = document.querySelector('.home-js')

libraryContRef.addEventListener('click', function () {
    btnClearLibrary.insertAdjacentHTML('beforeend', '<button class = "btn-clear">Clear library</button>')
})

homeContRef.addEventListener('click', function () {
    btnClearLibrary.style.display = 'none';
})