import DOMElementCreator from '../utils/DOMElementCreator'
import TAGS from '../shared/Tags.json';
import {arrayWithWords} from './consts'
import {arrayRandElement, defineNewWord, createElements}  from './showDetails'
import moveWord from './moveWord'

export default function generateWordContainers(array, arrForRandom) {
    const creator = new DOMElementCreator();
    const main = document.querySelector('MAIN');
    if (document.querySelector('.main-word')) {
      document.querySelector('.main-word').style.top = '0px';
      document.querySelector('.main-word').remove();
    }
    arrayWithWords.length = 0;
    if (main.lastChild) main.removeChild(main.lastChild);
    arrayRandElement(arrForRandom);
    const answersContainer = creator.create({
      elem: TAGS.DIV,
      classes: 'answers'
    });
    const mainWordContainer = creator.create({
      elem: TAGS.P,
      classes: 'main-word',
      child: [`${defineNewWord(array).word}`]
    });
    answersContainer.innerHTML = createElements();
    mainWordContainer.style.visibility = 'hidden';
    main.append(answersContainer);
    main.prepend(mainWordContainer);
    setTimeout(() => {
      mainWordContainer.style.visibility = 'visible';
    }, 100)
    moveWord();
  }
