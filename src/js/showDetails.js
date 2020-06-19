import {arrayWithWords, arrForUniqness} from './consts'
// ПЕРЕНАЗВАТЬ МОУДЛЬ
export function arrayRandElement(fullArray) {
  const randomIndex = Math.floor(Math.random() * fullArray.length);
  arrayWithWords.push(fullArray[randomIndex]);
  fullArray.splice(randomIndex, 1);
}
export function createElements() {
  return `<p>${arrayWithWords[0].translation}</p>
          <p>${arrayWithWords[1].translation}</p>
          <p>${arrayWithWords[2].translation}</p>
          <p>${arrayWithWords[3].translation}</p>`;
}
export function defineNewWord(arrayOfAnswers) {
  const randomIndex = Math.floor(Math.random() * arrayWithWords.length);
  const mainWord = arrayOfAnswers.filter((elem) => elem.word === arrayWithWords[randomIndex].word)[0];
  if (arrForUniqness.indexOf(mainWord) === -1) {
    defineNewWord(arrayOfAnswers);
  }
  arrForUniqness.splice(arrForUniqness.indexOf(mainWord), 1);
  return mainWord;
}
