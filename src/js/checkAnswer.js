import showNewWord from './showNewWord'

export default function checkAnswer(translation) {
  const allAnswers = document.querySelectorAll('.answers p');
  const mainWordContainer = document.querySelector('.main-word');
  allAnswers.forEach((item) => {
    item.addEventListener('click', (event) => {
      mainWordContainer.style.display = 'none';
      const choosenAnswer = event.target;
      if (choosenAnswer.textContent === translation) {
        choosenAnswer.style.backgroundColor = 'blue';
      } else {
        choosenAnswer.style.backgroundColor = 'red';
      }
      setTimeout(() => {
        showNewWord()
      }, 1500);
    })
  });
}
