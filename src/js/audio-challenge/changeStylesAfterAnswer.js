import {skipText} from './consts';

export default function changeStylesAfterAnswer() {
	const skipButton = document.querySelector('.skip-button');
	const soundIcon = document.querySelector('.sound-wrapper');
	const rightAnswerWrapper = document.querySelector('.right-answer-wrapper');
	skipButton.textContent = skipText;
	soundIcon.style.visibility = 'hidden';
	rightAnswerWrapper.style.visibility = 'visible';
}
