import showNewWord from './showNewWord';
import {DELAY_BEFORE_GAME} from './consts';

export default function generateElements() {
  const stone = document.querySelector('.stone-icon');
  const healthPoints = document.querySelector('.health-point-scale');
  const volumeContainer = document.querySelector('.volume-settings');
  const hint = document.querySelector('.hint');
  const loader = document.querySelector('.loader');
  const showDetails = new Promise ((resolve) => {
    setTimeout(() => {
      loader.remove();
      hint.style.visibility = 'hidden';
      resolve();
    }, DELAY_BEFORE_GAME);
  })
  showDetails.then(() => {
    healthPoints.style.visibility = 'visible';
    volumeContainer.style.visibility = 'visible';
    stone.style.visibility = 'visible';
    showNewWord();
  })
}
