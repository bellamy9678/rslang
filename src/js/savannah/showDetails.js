import {arrayWithWords, arrForUniqness, NUMBER_OF_WORDS} from './consts';
import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
// ПЕРЕНАЗВАТЬ МОУДЛЬ
export function arrayRandElement(fullArray) {
  const forTest = fullArray.slice();
  for (let i = 0; i < NUMBER_OF_WORDS; i += 1) {
    const randomIndex = Math.floor(Math.random() * fullArray.length);
    arrayWithWords.push(fullArray[randomIndex]);
    fullArray.splice(randomIndex, 1);
  }
  fullArray.splice(0, fullArray.length);
  forTest.forEach(item => {
    fullArray.push(item);
  });
}
export function createElements() {
  const creator = new DOMElementCreator();
  const main = document.querySelector('.info-wrapper');
  const answersContainer = creator.create({
    elem: TAGS.DIV,
    classes: 'answers'
  });
  for (let i = 0; i < NUMBER_OF_WORDS; i+=1) {
    const wordTranslation = creator.create({
      elem: TAGS.P,
      classes: 'answer',
      child: `${arrayWithWords[i].translate}`
    });
    answersContainer.append(wordTranslation);
    main.append(answersContainer);
  }
}
export function defineNewWord(arrayOfAnswers) {
  const randomIndex = Math.floor(Math.random() * arrayWithWords.length);
  let [mainWord] = arrayOfAnswers.filter((elem) => elem.word === arrayWithWords[randomIndex].word);
  while (arrForUniqness.indexOf(mainWord) === -1) {
    [mainWord] = arrayOfAnswers.filter((elem) => elem.word === arrayWithWords[Math.floor(Math.random() * arrayWithWords.length)].word);
  }
  arrForUniqness.splice(arrForUniqness.indexOf(mainWord), 1);
  return mainWord;
}
