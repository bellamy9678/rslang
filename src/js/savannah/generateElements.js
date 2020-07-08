import showNewWord from './showNewWord';

export default function generateElements() {
  const stone = document.querySelector('.stone-icon');
  const healthPoints = document.querySelector('.health-point-scale');
  const volumeContainer = document.querySelector('.volume-settings');
  const hint = document.querySelector('.hint');
  const loader = document.querySelector('.loader');
  const showDetails = new Promise ((resolve) => { // показывает обратный отсчет на 4 сек
    setTimeout(() => {
      loader.remove();
      hint.style.visibility = 'hidden';
      resolve();
    }, 4000);
  })
  showDetails.then(() => {
    healthPoints.style.visibility = 'visible';
    volumeContainer.style.visibility = 'visible';
    stone.style.visibility = 'visible';
    showNewWord();
  })
}
