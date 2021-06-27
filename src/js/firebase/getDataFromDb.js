export function addWatchedToLocalStorage(key) {
  return fetch(
    'https://astroteam-project-default-rtdb.europe-west1.firebasedatabase.app/watched.json',
  )
    .then(response => response.json())
    .then(watch => (watch ? watch[key] : []));
}

export function addQueueToLocalStorage(key) {
  return fetch(
    'https://astroteam-project-default-rtdb.europe-west1.firebasedatabase.app/queue.json',
  )
    .then(response => response.json())
    .then(queue => (queue ? queue[key] : []));
}
