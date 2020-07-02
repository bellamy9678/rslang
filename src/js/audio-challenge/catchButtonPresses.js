import checkAnswer from './checkAnswer';

export default function catchButtonPresses() {
	document.addEventListener('keydown', function defineButton(event) {
		const positionOfNumber = 5;
		const wordBeggining = 0;
		const wordEnding = 5;
		const numberOfDigit = event.code.slice(positionOfNumber, event.code.length);
		if (event.code.slice(wordBeggining, wordEnding) === 'Digit' && +numberOfDigit <= 5) {
			const choosenAnswer = document.querySelector(`.answers-wrapper__answer:nth-child(${numberOfDigit})`);
			checkAnswer(event, choosenAnswer);
		}
	});
}
