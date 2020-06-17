import words from './consts'

window.onload = () => {
  const startingButton = document.querySelector('.starting-button');
  const infoContainer = document.querySelector('.info');
  const main = document.querySelector('MAIN');
  const hint = document.querySelector('.hint');
  const healthPoints = document.querySelector('.health-point-scale');
  const volumeContainer = document.querySelector('.volume-settings');
  const volumeOn = document.querySelector('.volume-up-icon');
  const volumeOff = document.querySelector('.volume-mute-icon');
  const stone = document.querySelector('.stone-icon');
  const arrayWithWords = [];

  function arrayRandElement(fullArray) {
    const randomIndex = Math.floor(Math.random() * fullArray.length);
    arrayWithWords.push(fullArray[randomIndex]);
    fullArray.splice(randomIndex, 1);
  }

  startingButton.addEventListener('click', () => {
    const loader = document.createElement('DIV');
    loader.classList.add('loader');
    infoContainer.remove();
    hint.style.visibility = 'visible';
    main.prepend(loader);
    const showingDetails = new Promise ((resolve) => {
      setTimeout(() => {
        loader.remove();
        hint.style.visibility = 'hidden';
        resolve();
      }, 4000);
    })
    async function fetchWords() {
      return new Promise((resolve) => {
        resolve(words);
      })
    }

    showingDetails.then(() => {
      fetchWords().then(
        (resolve) => {
          const wordInfo = resolve;
          for (let i = 0; i < 3; i += 1) {
            arrayRandElement(wordInfo);
          }
          console.log(arrayWithWords);
        }
      )
      healthPoints.style.visibility = 'visible';
      volumeContainer.style.visibility = 'visible';
      stone.style.visibility = 'visible';
      const answersContainer = document.createElement('DIV');
      const firstAnswer = document.createElement('P');
      const secondAnswer = document.createElement('P');
      const thirdAnswer = document.createElement('P');
      const forthAnswer = document.createElement('P');
      const mainWord = document.createElement('P');
      answersContainer.append(firstAnswer);
      answersContainer.append(secondAnswer);
      answersContainer.append(thirdAnswer);
      answersContainer.append(forthAnswer);
      answersContainer.classList.add('answers');
      mainWord.classList.add('main-word');
      main.append(answersContainer);
      main.prepend(mainWord);

      const start = Date.now();
      const timer = setInterval(() => {
        const timePassed = Date.now() - start;
        if (timePassed >= 5000) {
          clearInterval(timer);
          return;
        }
        function draw(time) {
          mainWord.style.top = `${time / 10}px`;
        }
        draw(timePassed);
      }, 20);
    })
  });



  volumeContainer.addEventListener('click', () => {
    if (volumeOn.style.display === 'none') {
      volumeOn.style.display = 'block';
      volumeOff.style.display = 'none';
    } else {
      volumeOn.style.display = 'none';
      volumeOff.style.display = 'block';
    }
  })
}
