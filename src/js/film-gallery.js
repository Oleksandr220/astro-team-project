const refs = {
    
    galleryRef: document.querySelector('.js-gallery'),
   
}



function imagesMarkup (images) {
    refs.galleryRef.insertAdjacentHTML('beforeend', imageCardTpl(images));
}