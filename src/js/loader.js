const elLoader = document.querySelector('.loader'); 
const elContent = document.querySelector('.content'); 
/* для запуска спинера вызвать функцию onLoader() */
function onLoader() {
    elLoader.classList.remove("is-hidden");
    elContent.classList.add("on-loader");
}
/* для остановки спинера вызвать функцию stopLoader() */
function stopLoader() {
    elLoader.classList.add("is-hidden");
    elContent.classList.remove("on-loader");
}
export {onLoader, stopLoader}