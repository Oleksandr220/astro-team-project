const addToWatchedBtnRef = document.querySelector('[data-popup="backdrop"]')

addToWatchedBtnRef.addEventListener('click', onWatchedClick);

let itemsInWatched = JSON.parse(localStorage.getItem('watched'));

if (JSON.parse(localStorage.getItem('watched')) === null) {
    itemsInWatched = [];
} else {
    itemsInWatched = JSON.parse(localStorage.getItem('watched'))
};


function onWatchedClick(e) {
    const buttonWatched = document.querySelector('[data-watched]')
    const elementId = buttonWatched.dataset.id;
    console.log(e.target)

    if (e.target !== buttonWatched) {
        return;
    }

    itemsInWatched.push(elementId)
    const uniqueItems = unique(itemsInWatched);
    localStorage.setItem('watched', JSON.stringify(uniqueItems));

};

function unique(idItems) {
    let result = [];

    for (const id of idItems) {
        if (!result.includes(id)) {
            result.push(id);
        }
    }

    return result;
}