import {arrForUniqness, /* arrayWithWords , */ START_INDEX, FINAL_INDEX, REQUIRED_MARGIN} from './consts';
import defineArrays from './defineArrays';
import {handleWrongAnswer, handleRightAnswer} from './handleAnswers';

export default async function showNewWord() {
  function callShowNewWord() {
    setTimeout(() => {
      showNewWord();
    }, 1000);
  }
  const lifeIcon = document.querySelector('.health-point-scale IMG');
  if (arrForUniqness.length === 0 && lifeIcon) {
    await defineArrays();
  } else if (arrForUniqness.length !== 0 && lifeIcon) {
    await defineArrays();
  } else {
    console.log('endgame');
  }
  const mainWordContainer = document.querySelector('.main-word');
  const allAnswers = document.querySelectorAll('.answers p');
  const trackTheEnd = setInterval(() => {
    if (+(mainWordContainer.style.top.slice(START_INDEX, FINAL_INDEX)) >= REQUIRED_MARGIN) {
      handleWrongAnswer();
      callShowNewWord();
      clearInterval(trackTheEnd);
    }
  }, 50);

  function checkAnswer(choosenAnswer) {
    if (choosenAnswer.textContent === mainWordContainer.dataset.translate) {
      choosenAnswer.classList.add('right-answer__active');
      handleRightAnswer();
      callShowNewWord();
    } else {
      choosenAnswer.classList.add('wrong-answer__active');
      handleWrongAnswer();
      callShowNewWord();
    }
  }

  allAnswers.forEach((item) => {
    item.addEventListener('click', (event) => {
      const choosenAnswer = event.target;
      checkAnswer(choosenAnswer);
    });
  });
}
