import {idkText, skipText} from './consts';
import randomizeWords from './randomizeWords';

export default function goToTheNextWord() {
	const skipButton = document.querySelector('.skip-button');
	const soundIcon = document.querySelector('.sound-wrapper');
	const rightAnswerWrapper = document.querySelector('.right-answer-wrapper');
	skipButton.addEventListener('click', () => {
		if (skipButton.textContent === idkText) {
			skipButton.textContent = skipText;
			soundIcon.style.visibility = 'hidden';
			rightAnswerWrapper.style.visibility = 'visible';
			randomizeWords(/***/);
		}
	});
}
