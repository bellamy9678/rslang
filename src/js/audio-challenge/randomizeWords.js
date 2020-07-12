import generateElements from './generateElements';
import {NUMBER_OF_WRONG_ANSWERS, LEFT_MARGIN_OF_ANSWERED_QUESTION, arrayForUniqness, arrayForRandom, idkText, arrayWithRightAnswers, arrayWithWrongAnswers} from './consts';
import changeStylesAfterAnswer from './changeStylesAfterAnswer';
import checkAnswer from './checkAnswer';
import {catchButtonPresses, defineButton} from './catchButtonPresses';
import Result from '../game_result/Result';
import TAGS from '../shared/Tags.json';
import DOMElementCreator from '../utils/DOMElementCreator';
import {ASSETS_STORAGE} from '../shared/Constants';

export default function randomizeWords(words, array) {
	const mainWord = words[0];
	const arrayWithAnswers = [];
	const arrayForRand = array.slice();
	for (arrayWithAnswers.length; arrayWithAnswers.length < NUMBER_OF_WRONG_ANSWERS;) {
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
	function GetAnswers(item) {
		this.word = item.textContent;
		this.wordTranslate = item.dataset.translate;
		this.transcription = item.dataset;
		this.audio = item.dataset.audio.replace(ASSETS_STORAGE, '');;
	}
	skipButton.addEventListener('click', () => {
		const answerContainers = document.querySelectorAll('.answers-wrapper__answer');
		answerContainers.forEach(container => {
			container.removeEventListener('click', checkAnswer);
		});
		if (skipButton.textContent === idkText) {
			changeStylesAfterAnswer();
		} else if (arrayForUniqness.length === 10) {
			document.removeEventListener('keydown', defineButton);
			const creator = new DOMElementCreator();
			const resultReturnBtn = creator.create({
				elem: TAGS.BUTTON,
				classes: ['result__button', 'result__continue-btn'],
				child: 'returnBtnText',
			});
			const resultNewGameBtn = creator.create({
				elem: TAGS.BUTTON,
				classes: ['result__button', 'result__continue-btn'],
				child: 'newGameText',
			});
			const result = new Result();
			result.showResult({
				rightAnswers: arrayWithRightAnswers.map(item => new GetAnswers(item)),
				wrongAnswers: arrayWithWrongAnswers.map(item => new GetAnswers(item)),
				buttons: [resultReturnBtn, resultNewGameBtn]
			});
		} else {
			const mainWrapperContent = document.querySelector('.main-wrapper__content');
			mainWrapperContent.style.left = LEFT_MARGIN_OF_ANSWERED_QUESTION;
			setTimeout(() => {
				randomizeWords(arrayForUniqness, arrayForRandom);
			}, 1000);
		}
	});
	catchButtonPresses();
}
