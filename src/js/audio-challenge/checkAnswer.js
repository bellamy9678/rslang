import changeStylesAfterAnswer from './changeStylesAfterAnswer';

export default function checkAnswer(event) {
	const choosenAnswer = event.target;
	if (choosenAnswer.classList.contains('right-answer')) {
		console.log('correct');
		choosenAnswer.style.backgroundColor = 'green';
		changeStylesAfterAnswer();
	}	else {
		const rightAnswer = document.querySelector('.right-answer');
		rightAnswer.style.backgroundColor = 'green';
		choosenAnswer.style.backgroundColor = 'red';
		changeStylesAfterAnswer();
		// TODO: вызвать функцию передачи в словарь и записи в массив невыученных слов
	}
}
