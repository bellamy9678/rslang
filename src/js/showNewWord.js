import fetchWords from './fetchWords'
import {arrForUniqness} from './consts'
import generateWordContainers from './generateWordContainers'

export default async function showNewWord() {
  if (arrForUniqness.length === 0) {
    await fetchWords().then((resolve) => {
      const wordInfo = resolve;
      wordInfo.forEach(item => {
        arrForUniqness.push(item);
      });
      generateWordContainers(wordInfo);
    })
  } else {
    generateWordContainers(arrForUniqness);
  }
}
