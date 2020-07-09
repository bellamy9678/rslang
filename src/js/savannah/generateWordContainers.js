import {arrayWithWords} from './consts';
import arrayRandElement  from './showDetails';
import createElements  from './createElements';
import moveWord from './moveWord';

export default function generateWordContainers(array, arrForRandom) {
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
    createElements();
    moveWord();
  }
