export default function moveWord() {
  const start = Date.now();
  const mainWord = document.querySelector('.main-word');
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
}
