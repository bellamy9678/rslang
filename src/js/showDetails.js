const showDetails = new Promise ((resolve) => {
  const hint = document.querySelector('.hint');
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.remove();
    hint.style.visibility = 'hidden';
    resolve();
  }, 4000);
})

export default showDetails
