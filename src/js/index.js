window.onload = () => {
  const startingButton = document.querySelector('.starting-button');
  const infoContainer = document.querySelector('.info');
  const main = document.querySelector('MAIN');
  const hint = document.querySelector('.hint');
  startingButton.addEventListener('click', () => {
    const loader = document.createElement('DIV');
    loader.classList.add('loader');
    infoContainer.remove();
    hint.style.visibility = 'visible';
    main.prepend(loader);
    setTimeout(() => {
      loader.remove();
      hint.style.visibility = 'hidden';
    }, 4000)
  });
}
