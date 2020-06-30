export default function moveWord() {
  const start = Date.now();
  const mainWordContainer = document.querySelector('.main-word');
  const allAnswers = document.querySelectorAll('.answers p');
  const timer = setInterval(() => {
    const timePassed = Date.now() - start;
    const startIndex = 0;
    const finalIndex = 3;
    const requiredMargin = 497;
    if (+(mainWordContainer.style.top.slice(startIndex, finalIndex)) >= requiredMargin) {
      clearInterval(timer);
      return;
    }
    function draw(time) {
      mainWordContainer.style.top = `${time / 10}px`;
    }
    draw(timePassed);
  }, 21);

  allAnswers.forEach((item) => {
    item.addEventListener('click', () => {
      clearInterval(timer);
    });
  });
}
