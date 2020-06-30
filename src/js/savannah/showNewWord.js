import fetchWords from './fetchWords'
import {arrForUniqness, arrayWithWords, arrForRandFunc} from './consts'
import generateWordContainers from './generateWordContainers'
import {handleWrongAnswer, handleRightAnswer} from './handleAnswers'

export default async function showNewWord() {
  if (arrForUniqness.length === 0) {
    await fetchWords().then(async function (resolve){
      const wordInfo = resolve;
      arrForUniqness = wordInfo.slice();
      arrForRandFunc = wordInfo.slice();
      await generateWordContainers(wordInfo, arrForRandFunc);
    })
  } else if (arrForUniqness.length !== 0) {
    await generateWordContainers(arrForUniqness, arrForRandFunc);
  } else {
    console.log('endgame');
  }
  const mainWordContainer = document.querySelector('.main-word');
  const mainWord = arrayWithWords.filter((elem) => elem.word === mainWordContainer.textContent)[0];
  const allAnswers = document.querySelectorAll('.answers p');
  const trackTheEnd = setInterval(() => {
    const startIndex = 0;
    const finalIndex = 3;
    const requiredMargin = 496;
    if (+(mainWordContainer.style.top.slice(startIndex, finalIndex)) >= requiredMargin) {
      handleWrongAnswer(mainWord);
      setTimeout(() => {
        showNewWord();
      }, 1000);
      clearInterval(trackTheEnd);
    }
  }, 50);

  function checkAnswer(choosenAnswer) {
    if (choosenAnswer.textContent === mainWord.translation) {
      choosenAnswer.classList.add('right-answer__active');
      handleRightAnswer();
      setTimeout(() => {
        showNewWord();
      }, 1000);
    } else {
      choosenAnswer.classList.add('wrong-answer__active');
      handleWrongAnswer(mainWord);
      setTimeout(() => {
        showNewWord();
      }, 1000);
    }
  }

  allAnswers.forEach((item) => {
    item.addEventListener('click', (event) => {
      const choosenAnswer = event.target;
      checkAnswer(choosenAnswer);
    })
  });

  /* document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
      case 49:
        checkAnswer(document.querySelector('.answers:nth-child(1)'));
        break;
      case 50:
        checkAnswer(document.querySelector('.answers:nth-child(2)'));
        break;
      case 51:
        checkAnswer(document.querySelector('.answers:nth-child(3)'));
        break;
      case 52:
        checkAnswer(document.querySelector('.answers:nth-child(4)'));
        break;
      default:
    }
  }) */
}
