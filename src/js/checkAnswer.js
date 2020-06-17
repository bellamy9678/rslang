export default function checkAnswer(translation) {
  const allAnswers = document.querySelectorAll('.answers p');
  const mainWord = document.querySelector('.main-word');
  allAnswers.forEach((item) => {
    item.addEventListener('click', (event) => {
      mainWord.style.display = 'none';
      const choosenAnswer = event.target;
      if (choosenAnswer.textContent === translation) {
        choosenAnswer.style.backgroundColor = 'blue';
      } else {
        choosenAnswer.style.backgroundColor = 'red';
      }
    })
  });
}
