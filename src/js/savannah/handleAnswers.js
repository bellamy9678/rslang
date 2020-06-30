function handleWrongAnswer(mainWord) {
  const mainWordContainer = document.querySelector('.main-word');
  const allAnswers = document.querySelectorAll('.answers p');
  const lifeIcon = document.querySelector('.health-point-scale IMG');
  const newOpacity = '0';
  const newFontSize = '100px';
  mainWordContainer.style.opacity = newOpacity;
  mainWordContainer.style.fontSize = newFontSize;
  allAnswers.forEach(answer => {
    if (answer.textContent === mainWord.wordTranslate) {
      answer.classList.add('right-answer__active');
    }
  });
  if (lifeIcon !== null) {
    lifeIcon.remove();
  } else {
    console.log('endgame');
  }
}

function handleRightAnswer() {
  const mainWordContainer = document.querySelector('.main-word');
  const newWidth = '1px';
  const whiteColor = 'white';
  mainWordContainer.style.marginLeft = `${mainWordContainer.style.width / 2}px`;
  mainWordContainer.style.width = newWidth;
  setTimeout(() => {
    mainWordContainer.style.backgroundColor = whiteColor;
  }, 900);
}

export {handleWrongAnswer, handleRightAnswer};
