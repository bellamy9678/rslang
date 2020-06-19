import generateElements from './generateElements'

window.onload = () => {
  const startingButton = document.querySelector('.starting-button');
  const infoContainer = document.querySelector('.info');
  const main = document.querySelector('MAIN');
  const hint = document.querySelector('.hint');
  const volumeContainer = document.querySelector('.volume-settings');
  const volumeOn = document.querySelector('.volume-up-icon');
  const volumeOff = document.querySelector('.volume-mute-icon');

  async function game() {
    const loader = document.createElement('DIV');
    loader.classList.add('loader');
    infoContainer.remove();
    hint.style.visibility = 'visible';
    main.prepend(loader);
    generateElements();
  }

  startingButton.addEventListener('click', game);

  volumeContainer.addEventListener('click', () => {
    if (volumeOn.style.display === 'none') {
      volumeOn.style.display = 'block';
      volumeOff.style.display = 'none';
    } else {
      volumeOn.style.display = 'none';
      volumeOff.style.display = 'block';
    }
  })
}
