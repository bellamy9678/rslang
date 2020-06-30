import {arrayWithWords, arrForUniqness} from './consts'
// ПЕРЕНАЗВАТЬ МОУДЛЬ
export function arrayRandElement(fullArray) {
  const forTest = [];
  const numberOfAnswers = 4;
  fullArray.forEach(item => {
    forTest.push(item)
  });
  for (let i = 0; i < numberOfAnswers; i += 1) {
    const randomIndex = Math.floor(Math.random() * fullArray.length);
    arrayWithWords.push(fullArray[randomIndex]);
    fullArray.splice(randomIndex, 1);
  }
  fullArray.splice(0, fullArray.length);
  forTest.forEach(item => {
    fullArray.push(item)
  });
}
export function createElements() {
  return `<p>${arrayWithWords[0].translation}</p>
          <p>${arrayWithWords[1].translation}</p>
          <p>${arrayWithWords[2].translation}</p>
          <p>${arrayWithWords[3].translation}</p>`;
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
