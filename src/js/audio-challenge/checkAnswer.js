import changeStylesAfterAnswer from './changeStylesAfterAnswer';
import {arrayWithRightAnswers, arrayWithWrongAnswers} from './consts';

export default function checkAnswer(event, element) {
	const answerContainers = document.querySelectorAll('.answers-wrapper__answer');
	answerContainers.forEach(container => {
		container.removeEventListener('click', checkAnswer);
	});
	const mainWord = document.querySelector('.right-answer-wrapper__word-container__word');
	function check(choosenAnswer) {
		if (choosenAnswer.classList.contains('right-answer')) {
			choosenAnswer.classList.add('answered-right');
			arrayWithRightAnswers.push(mainWord);
		}	else {
			const rightAnswer = document.querySelector('.right-answer');
			rightAnswer.classList.add('answered-right');
			choosenAnswer.classList.add('answered-wrong');
			arrayWithWrongAnswers.push(mainWord);
			// TODO: вызвать функцию передачи в словарь
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
