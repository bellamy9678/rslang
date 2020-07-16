import {VALUE_OF_KEYS, START_INDEX, FINAL_INDEX, REQUIRED_MARGIN, POSITION_OF_NUMBER, WORD_ENDING, WORD_BEGGINING} from './consts';

export default function moveWord() {
	const start = Date.now();
	const mainWordContainer = document.querySelector('.main-word');
	const allAnswers = document.querySelectorAll('.answers p');
	let requestId;

	function draw(time) {
		mainWordContainer.style.top = `${time / 10}px`;
	}

	function step() {
		const timePassed = Date.now() - start;
		if (+(mainWordContainer.style.top.slice(START_INDEX, FINAL_INDEX)) >= REQUIRED_MARGIN) {
			cancelAnimationFrame(requestId);
			return;
		}
		draw(timePassed);
		requestId = requestAnimationFrame(step);
	}

	step();

	allAnswers.forEach((item) => {
		item.addEventListener('click', () => {
			cancelAnimationFrame(requestId);
		});
	});

	function stopMoving(event) {
		const numberOfDigit = event.code.slice(POSITION_OF_NUMBER, event.code.length);
		if (event.code.slice(WORD_BEGGINING, WORD_ENDING) === 'Digit' && +numberOfDigit <= VALUE_OF_KEYS) {
			cancelAnimationFrame(requestId);
		}
		document.removeEventListener('keydown', stopMoving);
	}

	document.addEventListener('keydown', stopMoving);
}
