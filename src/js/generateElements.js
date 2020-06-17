import moveWord from './moveWord'
import showDetails from './showDetails'
import fetchWords from './fetchWords'

export default function generateElements() {
  const stone = document.querySelector('.stone-icon');
  const healthPoints = document.querySelector('.health-point-scale');
  const main = document.querySelector('MAIN');
  const volumeContainer = document.querySelector('.volume-settings');
  showDetails.then(() => {
    const arrayWithWords = [];
    function arrayRandElement(fullArray) {
      const randomIndex = Math.floor(Math.random() * fullArray.length);
      arrayWithWords.push(fullArray[randomIndex]);
      fullArray.splice(randomIndex, 1);
    }
    function createElements() {
      return `<p>${arrayWithWords[0].translation}</p>
              <p>${arrayWithWords[1].translation}</p>
              <p>${arrayWithWords[2].translation}</p>
              <p>${arrayWithWords[3].translation}</p>`;
    }
    fetchWords().then((resolve) => {
        const wordInfo = resolve;
        for (let i = 0; i < 4; i += 1) {
          arrayRandElement(wordInfo);
        }
        const randomIndex = Math.floor(Math.random() * arrayWithWords.length);
        const answersContainer = document.createElement('DIV');
        answersContainer.innerHTML = createElements();
        const mainWord = document.createElement('P');
        answersContainer.classList.add('answers');
        mainWord.classList.add('main-word');
        mainWord.textContent = `${arrayWithWords[randomIndex].word}`;
        main.append(answersContainer);
        main.prepend(mainWord);
        moveWord();
      }
    )
    healthPoints.style.visibility = 'visible';
    volumeContainer.style.visibility = 'visible';
    stone.style.visibility = 'visible';
  })
}
