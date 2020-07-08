import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import {arrayWithWords} from './consts';
import {arrayRandElement, defineNewWord, createElements}  from './showDetails';
import moveWord from './moveWord';

export default function generateWordContainers(array, arrForRandom) {
    const creator = new DOMElementCreator();
    const main = document.querySelector('.info-wrapper');
    const mainWord = document.querySelector('.main-word');
    if (mainWord) {
      const wordIndent = '0px';
      mainWord.style.top = wordIndent;
      mainWord.remove();
    }
    arrayWithWords.length = 0;
    if (main.lastChild) main.removeChild(main.lastChild);
    arrayRandElement(arrForRandom);
    const word = defineNewWord(array);
    const mainWordContainer = creator.create({
      elem: TAGS.P,
      classes: 'main-word',
      child: [`${word.word}`],
      attr: [{
           'data-translate': `${word.translate}`
      }, {
           'data-word': `${word.word}`
      }, {
           'data-audio': `${word.audio}`
      }]
    });
    createElements();
    mainWordContainer.style.visibility = 'hidden';
    main.prepend(mainWordContainer);
    setTimeout(() => {
      mainWordContainer.style.visibility = 'visible';
    }, 100);
    moveWord();
  }
