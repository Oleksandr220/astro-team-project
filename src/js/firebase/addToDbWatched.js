import { renderWatchedList } from '../renderWatched';
import { renderQueueList } from '../renderQueue';

const labraryBtn = document.querySelector('.library-js');

export function saveToDb(btnRef) {
  const key = localStorage.getItem('userId');
  if (!key) {
    return;
  }

  btnRef.addEventListener('click', addToDb);
}

export function deleteFromDb(btnRef) {
  const key = localStorage.getItem('userId');
  if (!key) {
    return;
  }

  btnRef.addEventListener('click', remove);
}

function addToDb(e) {
  const key = localStorage.getItem('userId');
  const elementId = e.target.dataset.id;
  const query = e.target.dataset.list;
  const saved = JSON.parse(localStorage.getItem(query)) || [];
  saved.push(elementId);
  e.target.disabled = true;
  fetch(`https://astroteam-project-default-rtdb.europe-west1.firebasedatabase.app/${query}.json`, {
    method: 'PATCH',
    body: JSON.stringify({ [key]: saved }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(response => {
      localStorage.setItem(query, JSON.stringify(saved));
      e.target.textContent = query === 'watched' ? 'DELETE FROM WATCHED' : 'DELETE FROM QUEUE';
      e.target.disabled = false;
      e.target.removeEventListener('click', addToDb);
      e.target.addEventListener('click', remove);
      if (labraryBtn.classList.contains('logo-current')) {
        query === 'watched' ? renderWatchedList() : renderQueueList();
      }
    });
}

function remove(e) {
  const key = localStorage.getItem('userId');
  const elementId = e.target.dataset.id;
  const query = e.target.dataset.list;
  const saved = JSON.parse(localStorage.getItem(query));
  e.target.disabled = true;
  fetch(`https://astroteam-project-default-rtdb.europe-west1.firebasedatabase.app/${query}.json`, {
    method: 'PATCH',
    body: JSON.stringify({ [key]: saved.filter(film => film !== elementId) }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(response => {
      const data = response ? response[key] : [];
      localStorage.setItem(query, JSON.stringify(data ? data : []));
      e.target.textContent = query === 'watched' ? 'ADD TO WATCHED' : 'ADD TO QUEUE';
      e.target.disabled = false;
      e.target.removeEventListener('click', remove);
      e.target.addEventListener('click', addToDb);
      if (labraryBtn.classList.contains('logo-current')) {
        query === 'watched' ? renderWatchedList() : renderQueueList();
      }
    });
}