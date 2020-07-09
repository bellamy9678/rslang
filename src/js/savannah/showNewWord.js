import {VALUE_OF_KEYS, WORD_ENDING, POSITION_OF_NUMBER, WORD_BEGGINING, arrForRandFunc, arrForUniqness, arrayWithRightAnswers, arrayWithWrongAnswers, /* arrayWithWords , */ START_INDEX, FINAL_INDEX, REQUIRED_MARGIN} from './consts';
import defineArrays from './defineArrays';
import endgame from './endGame';
import generateWordContainers from './generateWordContainers';
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
    await generateWordContainers(arrForUniqness, arrForRandFunc);
  } else {
    endgame(arrayWithRightAnswers, arrayWithWrongAnswers);
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
      checkAnswer(event.target);
    });
  });

  function defineButton(event) {
  	const numberOfDigit = event.code.slice(POSITION_OF_NUMBER, event.code.length);
  	if (event.code.slice(WORD_BEGGINING, WORD_ENDING) === 'Digit' && +numberOfDigit <= VALUE_OF_KEYS) {
  		const choosenAnswer = document.querySelector(`.answer:nth-child(${numberOfDigit})`);
      checkAnswer(/* event, */ choosenAnswer);
  	}
    document.removeEventListener('keydown', defineButton);
  }
	document.addEventListener('keydown', defineButton);
}
