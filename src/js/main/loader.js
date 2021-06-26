const elLoader = document.querySelector('.loader'); 
const elContent = document.querySelector('.content'); 
/* для запуска спинера вызвать функцию onLoader() */
function onLoader() {
    elLoader.classList.remove("is-hidden");
    elContent.classList.add("on-loader");
}
/* для остановки спинера вызвать функцию stopLoader() */
function stopLoader() {
    setTimeout(()=>{
        const allCard = document.querySelectorAll('img[data-src]')
         allCard.forEach(function(element) {
         element.setAttribute('src', element.getAttribute('data-src'))
         element.onload = element.removeAttribute('data-src');
       })
       },
 50)
        
 document.onload = stopSpin()
 function stopSpin() {
     elLoader.classList.add("is-hidden");
     elContent.classList.remove("on-loader");
}
}
export {onLoader, stopLoader}