function handleWrongAnswer(mainWord) {
  const mainWordContainer = document.querySelector('.main-word');
  const allAnswers = document.querySelectorAll('.answers p');
  const lifeIcon = document.querySelector('.health-point-scale IMG');
  mainWordContainer.style.opacity = '0';
  mainWordContainer.style.fontSize = '100px';
  allAnswers.forEach(answer => {
    if (answer.textContent === mainWord.translation) {
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
  mainWordContainer.style.marginLeft = `${mainWordContainer.style.width / 2}px`;
  mainWordContainer.style.width = '1px';
  setTimeout(() => {
    mainWordContainer.style.backgroundColor = 'white';
  }, 900);
}

export {handleWrongAnswer, handleRightAnswer}
