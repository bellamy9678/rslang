import generateElements from './generateElements';
import { NUMBER_OF_WRONG_ANSWERS, LEFT_MARGIN_OF_ANSWERED_QUESTION, arrayForUniqness, arrayForRandom, idkText, arrayWithRightAnswers, arrayWithWrongAnswers } from './consts';
import changeStylesAfterAnswer from './changeStylesAfterAnswer';
import checkAnswer from './checkAnswer';
import getWords from './getWords';
import Word from './Word';
import { catchButtonPresses, defineButton } from './catchButtonPresses';
import Result from '../game_result/Result';
import TAGS from '../shared/Tags.json';
import DOMElementCreator from '../utils/DOMElementCreator';
import { GAMES_NAMES, RESULT_MULTIPLIER } from '../statistics/constants';
import Statistics from '../statistics/Statistics';


export default function randomizeWords(words, array) {
	const mainWord = words[0];
	const arrayWithAnswers = [];
	const arrayForRand = array.slice();
	let numberOfAnswers = NUMBER_OF_WRONG_ANSWERS;
	if (array.length < NUMBER_OF_WRONG_ANSWERS) {
		numberOfAnswers = array.length - 1;
	}
	for (arrayWithAnswers.length; arrayWithAnswers.length < numberOfAnswers;) {
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

	async function newRound() {
		arrayForUniqness.length = 0;
		arrayForRandom.length = 0;
		arrayWithRightAnswers.length = 0;
		arrayWithWrongAnswers.length = 0;
		new Promise(resolve => {
			const receivedWords = getWords();
			resolve(receivedWords);
		})
			.then((receivedWords) => {
				const allWords = receivedWords.map(word => new Word(word));
				allWords.forEach(item => {
					arrayForUniqness.push(item);
				});
				allWords.forEach(item => {
					arrayForRandom.push(item);
				});
			})
			.then(() => randomizeWords(arrayForUniqness, arrayForRandom));
	}

	skipButton.addEventListener('click', () => {
		const answerContainers = document.querySelectorAll('.answers-wrapper__answer');
		answerContainers.forEach(container => {
			container.removeEventListener('click', checkAnswer);
		});
		if (skipButton.textContent === idkText) {
			changeStylesAfterAnswer();
		} else if (arrayForUniqness.length === 10 || arrayForUniqness.length === 0) {
			document.removeEventListener('keydown', defineButton);
			const creator = new DOMElementCreator();
			const resultNewGameBtn = creator.create({
				elem: TAGS.BUTTON,
				classes: ['result__button', 'result__continue-btn'],
				child: 'Play again',
			});
			const result = new Result();

			resultNewGameBtn.addEventListener('click', () => {
				result.closeResultWindow();
				newRound();
			});

			const resultPoints = {
				name: GAMES_NAMES.AUDIO,
				result:
					arrayWithRightAnswers.length * RESULT_MULTIPLIER.CORRECT +
					arrayWithWrongAnswers.length * RESULT_MULTIPLIER.INCORRECT,
			};
			Statistics.putGamesResult(resultPoints);
			result.showResult({
				rightAnswers: arrayWithRightAnswers,
				wrongAnswers: arrayWithWrongAnswers,
				buttons: [resultNewGameBtn]
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
