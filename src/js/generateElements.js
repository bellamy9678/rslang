import showNewWord from './showNewWord'
import {arrayWithWords} from './consts'
import checkAnswer from './checkAnswer'

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
    }, 1000); // СМЕНИТЬ НА 4000
  })
  showDetails.then(() => { // отображает основную страницу игры
    healthPoints.style.visibility = 'visible';
    volumeContainer.style.visibility = 'visible';
    stone.style.visibility = 'visible';
    showNewWord().then(() => { // выводит новое слово и варианты ответов
      const mainWordContainer = document.querySelector('.main-word');
      const mainWord = arrayWithWords.filter((elem) => elem.word === mainWordContainer.textContent)[0];
      checkAnswer(mainWord.translation);
    });
  })
}
