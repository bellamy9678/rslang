import {arrayWithWords} from './consts'
import {arrayRandElement, defineNewWord, createElements}  from './showDetails'
import moveWord from './moveWord'

export default function generateWordContainers(array) {
    arrayWithWords.length = 0;
    const main = document.querySelector('MAIN');
    if (main.lastChild) main.removeChild(main.lastChild);
    const arrForRandom = [];
    array.forEach(item => {
      arrForRandom.push(item);
    });
    for (let i = 0; i < 4; i += 1) {
      arrayRandElement(arrForRandom);
    }
    const answersContainer = document.createElement('DIV');
    const mainWordContainer = document.createElement('P');
    answersContainer.innerHTML = createElements();
    answersContainer.classList.add('answers');
    mainWordContainer.classList.add('main-word');
    mainWordContainer.textContent = `${defineNewWord(array).word}`;
    main.append(answersContainer);
    main.prepend(mainWordContainer);
    moveWord();
  }
