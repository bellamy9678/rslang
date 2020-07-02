import generateElements from './generateElements';
import {arrayForUniqness, arrayForRandom, idkText} from './consts';
import changeStylesAfterAnswer from './changeStylesAfterAnswer';
import catchButtonPresses from './catchButtonPresses';

export default function randomizeWords(words, array) {
	const mainWord = words[0];
	const arrayWithAnswers = [];
	const numberOfWrongAnswers = 4;
	const arrayForRand = array.slice();
	for (arrayWithAnswers.length; arrayWithAnswers.length < numberOfWrongAnswers;) {
		const randomIndex = Math.floor(Math.random() * arrayForRand.length);
		if (arrayForRand[randomIndex] !== mainWord) {
			arrayWithAnswers.push(arrayForRand[randomIndex]);
		}
		arrayForRand.splice(randomIndex, 1);
	}
	words.splice(0, 1);
	const indexForMainWord = Math.floor(Math.random() * arrayWithAnswers.length);
	arrayWithAnswers.splice(indexForMainWord, 0, mainWord);
	generateElements(mainWord, arrayWithAnswers);
	const skipButton = document.querySelector('.skip-button');
	skipButton.addEventListener('click', () => {
		if (skipButton.textContent === idkText) {
			changeStylesAfterAnswer();
		} else {
			randomizeWords(arrayForUniqness, arrayForRandom);
		}
	});
	catchButtonPresses();
}
