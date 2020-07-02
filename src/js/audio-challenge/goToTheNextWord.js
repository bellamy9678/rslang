import {idkText, skipText} from './consts';
import randomizeWords from './randomizeWords';
import changeStylesAfterAnswer from './changeStylesAfterAnswer';

export default function goToTheNextWord() {
	const skipButton = document.querySelector('.skip-button');
	skipButton.addEventListener('click', () => {
		if (skipButton.textContent === idkText) {
			changeStylesAfterAnswer();
		}
		if (skipButton.textContent === skipText) {
			randomizeWords();
		}
	});
}
