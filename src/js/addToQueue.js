const addToQueueBtnRef = document.querySelector('[data-popup="backdrop"]')

addToQueueBtnRef.addEventListener('click', onQueueClick);

let itemsInQueue = JSON.parse(localStorage.getItem('queue'));

if (JSON.parse(localStorage.getItem('queue')) === null) {
    itemsInQueue = [];
} else {
    itemsInQueue = JSON.parse(localStorage.getItem('queue'))
};


function onQueueClick(e) {
    const buttonQueue = document.querySelector('[data-queue]')
    const elementId = buttonQueue.dataset.id;


    if (e.target !== buttonQueue) {
        return;
    }

    itemsInQueue.push(elementId)
    const uniqueItems = unique(itemsInQueue);
    localStorage.setItem('queue', JSON.stringify(uniqueItems));

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