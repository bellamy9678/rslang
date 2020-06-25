import {arrayWithWords} from './consts'
import {arrayRandElement, defineNewWord, createElements}  from './showDetails'
import moveWord from './moveWord'

export default function generateWordContainers(array, arrForRandom) {
    const main = document.querySelector('MAIN');
    if (document.querySelector('.main-word')) {
      document.querySelector('.main-word').style.top = '0px';
      document.querySelector('.main-word').remove();
    }
    arrayWithWords.length = 0;
    if (main.lastChild) main.removeChild(main.lastChild);
    arrayRandElement(arrForRandom);
    const answersContainer = document.createElement('DIV');
    const mainWordContainer = document.createElement('P');
    answersContainer.innerHTML = createElements();
    answersContainer.classList.add('answers');
    mainWordContainer.classList.add('main-word');
    mainWordContainer.textContent = `${defineNewWord(array).word}`;
    mainWordContainer.style.visibility = 'hidden';
    main.append(answersContainer);
    main.prepend(mainWordContainer);
    setTimeout(() => {
      mainWordContainer.style.visibility = 'visible';
    }, 100)
    moveWord();
  }
