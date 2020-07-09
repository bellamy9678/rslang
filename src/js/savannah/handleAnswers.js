import {arrayWithRightAnswers, arrayWithWrongAnswers} from './consts';

function handleWrongAnswer() {
  const mainWordContainer = document.querySelector('.main-word');
  const allAnswers = document.querySelectorAll('.answers p');
  const lifeIcon = document.querySelector('.health-point-scale IMG');
  const volumeContainer = document.querySelector('.volume-settings');
  const errorSound = document.querySelector('.error-sound');
  const newOpacity = '0';
  const newFontSize = '100px';
  if (!volumeContainer.classList.contains('silence-mode')) {
    errorSound.play();
  }
  mainWordContainer.style.opacity = newOpacity;
  mainWordContainer.style.fontSize = newFontSize;
  allAnswers.forEach(answer => {
    if (answer.textContent === mainWordContainer.dataset.translate) {
      answer.classList.add('right-answer__active');
    }
  });
  arrayWithWrongAnswers.push(mainWordContainer);
  if (lifeIcon !== null) {
    lifeIcon.remove();
  }
}

function handleRightAnswer() {
  const mainWordContainer = document.querySelector('.main-word');
  const correctSound = document.querySelector('.correct-sound');
  const volumeContainer = document.querySelector('.volume-settings');
  const newWidth = '1px';
  const whiteColor = 'white';
  if (!volumeContainer.classList.contains('silence-mode')) {
    correctSound.play();
  }
  mainWordContainer.style.marginLeft = `${mainWordContainer.style.width / 2}px`;
  mainWordContainer.style.width = newWidth;
  arrayWithRightAnswers.push(mainWordContainer);
  setTimeout(() => {
    mainWordContainer.style.backgroundColor = whiteColor;
  }, 900);
}

export {handleWrongAnswer, handleRightAnswer};
