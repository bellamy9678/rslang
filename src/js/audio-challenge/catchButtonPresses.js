import checkAnswer from './checkAnswer';
import {POSITION_OF_NUMBER, WORD_BEGGINING, WORD_ENDING, VALUE_OF_KEYS} from './consts';

export function defineButton(event) {
	const numberOfDigit = event.code.slice(POSITION_OF_NUMBER, event.code.length);
	if (event.code.slice(WORD_BEGGINING, WORD_ENDING) === 'Digit' && +numberOfDigit <= VALUE_OF_KEYS) {
		const choosenAnswer = document.querySelector(`.answers-wrapper__answer:nth-child(${numberOfDigit})`);
		checkAnswer(event, choosenAnswer);
	}
}
export function catchButtonPresses() {
	document.addEventListener('keydown', defineButton);
}
