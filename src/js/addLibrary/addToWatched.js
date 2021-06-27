const addToWatchedBtnRef = document.querySelector('[data-popup="backdrop"]');

const key = localStorage.getItem('userId');
if (!key) {
  addToWatchedBtnRef.addEventListener('click', onWatchedClick);

  let itemsInWatched = JSON.parse(localStorage.getItem('watched'));

  if (JSON.parse(localStorage.getItem('watched')) === null) {
    itemsInWatched = [];
  } else {
    itemsInWatched = JSON.parse(localStorage.getItem('watched'));
  }

  function onWatchedClick(e) {
    const buttonWatched = document.querySelector('[data-watched]');

    if (e.target !== buttonWatched) {
      return;
    }
    const elementId = buttonWatched.dataset.id;
    const indexOfEl = itemsInWatched.indexOf(elementId);
    if (indexOfEl >= 0 && buttonWatched.textContent === 'DELETE FROM WATCHED') {
      buttonWatched.textContent = 'ADD TO WATCHED';
      itemsInWatched.splice(indexOfEl, 1);

      if (itemsInWatched.length === 0) {
        localStorage.removeItem('watched');
        return;
      }

      localStorage.setItem('watched', JSON.stringify(itemsInWatched));
      return;
    }

    itemsInWatched.push(elementId);
    const uniqueItems = unique(itemsInWatched);
    localStorage.setItem('watched', JSON.stringify(uniqueItems));
    buttonWatched.textContent = 'DELETE FROM WATCHED';

    return;
  }

  function unique(idItems) {
    let result = [];

    for (const id of idItems) {
      if (!result.includes(id)) {
        result.push(id);
      }
    }

    return result;
  }
}
