import fetchWords from './fetchWords'
import {arrForUniqness, arrayWithWords} from './consts'
import generateWordContainers from './generateWordContainers'

export default async function showNewWord() {
  const lifeIcon = document.querySelector('.health-point-scale IMG');
  if (arrForUniqness.length === 0) {
    await fetchWords().then(async function (resolve){
      const wordInfo = resolve;
      wordInfo.forEach(item => {
        arrForUniqness.push(item);
      });
      await generateWordContainers(wordInfo);
    })
  } else {
    await generateWordContainers(arrForUniqness);
  }
  const mainWordContainer = document.querySelector('.main-word');
  const mainWord = arrayWithWords.filter((elem) => elem.word === mainWordContainer.textContent)[0];
  const allAnswers = document.querySelectorAll('.answers p');
  function handleWrongAnswer() {
    allAnswers.forEach(answer => {
      if (answer.textContent === mainWord.translation) {
        answer.classList.add('right-answer__active');
      }
    });
    if (lifeIcon !== null) {
      lifeIcon.remove();
    } else {
      console.log('endgame');
    }
    setTimeout(() => {
      showNewWord();
    }, 1000);
  }

  const trackTheEnd = setInterval(() => {
    if (+(mainWordContainer.style.top.slice(0, 3)) >= 496) {
      mainWordContainer.style.display = 'none';
      handleWrongAnswer();
      clearInterval(trackTheEnd);
    }
  }, 50);

  allAnswers.forEach((item) => {
    item.addEventListener('click', (event) => {
      mainWordContainer.style.display = 'none';
      const choosenAnswer = event.target;
      if (choosenAnswer.textContent === mainWord.translation) {
        choosenAnswer.classList.add('right-answer__active');
        setTimeout(() => {
          showNewWord()
        }, 1000);
      } else {
        choosenAnswer.classList.add('wrong-answer__active');
        handleWrongAnswer();
      }
    })
  });
}
