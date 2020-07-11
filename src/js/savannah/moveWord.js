import {START_INDEX, FINAL_INDEX, REQUIRED_MARGIN} from './consts';

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
	document.addEventListener('keydown', () => {
		cancelAnimationFrame(requestId);
	});
}
