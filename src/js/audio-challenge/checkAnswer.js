import changeStylesAfterAnswer from './changeStylesAfterAnswer';
import {arrayWithRightAnswers, arrayWithWrongAnswers} from './consts';

export default function checkAnswer(event, element) {
	const mainWord = document.querySelector('.right-answer-wrapper__word-container__word');
	function check(choosenAnswer) {
		if (choosenAnswer.classList.contains('right-answer')) {
			console.log('correct');
			choosenAnswer.classList.add('green');
			arrayWithRightAnswers.push(mainWord);
		}	else {
			const rightAnswer = document.querySelector('.right-answer');
			rightAnswer.style.backgroundColor = 'green';
			choosenAnswer.classList.add('red');
			arrayWithWrongAnswers.push(mainWord);
			// TODO: вызвать функцию передачи в словарь и записи в массив невыученных слов
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
