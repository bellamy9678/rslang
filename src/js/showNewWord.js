import fetchWords from './fetchWords'
import {arrForUniqness, arrayWithWords} from './consts'
import generateWordContainers from './generateWordContainers'

export default async function showNewWord() {
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
  allAnswers.forEach((item) => {
    item.addEventListener('click', (event) => {
      mainWordContainer.style.display = 'none';
      const choosenAnswer = event.target;
      if (choosenAnswer.textContent === mainWord.translation) {
        choosenAnswer.style.backgroundColor = 'blue';
      } else {
        choosenAnswer.style.backgroundColor = 'red';
      }
      setTimeout(() => {
        showNewWord()
      }, 1000);
    })
  });
}
