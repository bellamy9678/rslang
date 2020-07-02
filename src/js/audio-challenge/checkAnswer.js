import changeStylesAfterAnswer from './changeStylesAfterAnswer';

export default function checkAnswer(event, element) {
	function check(choosenAnswer) {
		if (choosenAnswer.classList.contains('right-answer')) {
			console.log('correct');
			choosenAnswer.classList.add('green');
		}	else {
			const rightAnswer = document.querySelector('.right-answer');
			rightAnswer.style.backgroundColor = 'green';
			choosenAnswer.classList.add('red');
			// TODO: вызвать функцию передачи в словарь и записи в массив невыученных слов
			// TODO: поменять стили (добавление классов)
		}
	}
	if (event.type === 'click') {
		check(event.target);
	}
	if (event.type === 'keydown') {
		check(element);
	}
	changeStylesAfterAnswer();
}
