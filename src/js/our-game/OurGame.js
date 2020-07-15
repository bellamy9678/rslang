import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';

import renderWords from './RenderWords';

import renderTranslate from './RenderTranslate';

import shuffle from './Helper';

import initMain from './GamePage';

import Service from '../words_service/Service';

import Result from '../game_result/Result';

import {
	statisticText,
	// newGameText
} from './OurGameConsts';

import createHeader from './GameHeader';


async function getWords() {
	const {
		repeatWords,
		level,
		round
	} = JSON.parse(localStorage.getItem('gameData'));
	if (repeatWords === true) {
		const userWords = await Service.getGameWords();
		return userWords;
	}
	const allWords = await Service.getGameSpecificWords(level, round);
	return allWords;
}

// create dom
export default function initGame() {
	const app = document.querySelector('.app');
	const newElem = new DOMElementCreator();

	const wrapper = newElem.create({
		elem: TAGS.DIV,
		classes: 'wrapper',
		child: [createHeader(), initMain()],
		id: 'ourgame__wrapper',
	});

	app.append(wrapper);
	document.body.classList.add('ourgame__body');

	const gameContainer = document.getElementById('game-cont');
	const engWordsContainer = document.getElementById('eng-container');
	const translationContainer = document.getElementById('transl-container');
	const engWords = document.getElementsByClassName('word-our-game');
	const finishBtn = document.getElementById('finish');
	const translation = document.getElementsByClassName('word-translation-ourgame');
	const points = document.getElementById('game-points');
	const gameResult = new Result();
	const correctSound = new Audio('https://raw.githubusercontent.com/garza0/rslang-data/master/correct.mp3');
	const wrongSound = new Audio('https://raw.githubusercontent.com/garza0/rslang-data/master/wrong.mp3');
	const guessed = [];
	const zero = 0;
	points.textContent = zero;
	const wordsRound = 15;
	const correctAnswers = [];
	const wrongAns = [];
	let receivedWords = [];
	let wordlength;

	function initGetWords() {

		getWords().then(res => {

			const neededWords = res.slice(zero, wordsRound);
			receivedWords = [...neededWords];
			wordlength = receivedWords.length;
			let words = neededWords.map((item, index) => renderWords(item, index));
			words = shuffle(words);
			words.forEach(el => engWordsContainer.append(el));

			let translations = res.slice(zero, wordsRound).map(item => renderTranslate(item));
			translations = shuffle(translations);
			translations.forEach(el => translationContainer.append(el));
		});
	}


	function GameHandlers() {

		this.startNewGame = () => {
			gameResult.closeResultWindow();
			points.classList.add('none');
			gameContainer.classList.add('none');
			[...engWords].forEach(el => el.remove());
			[...translation].forEach(el => el.remove());
			points.textContent = '0';
			guessed.length = zero;
			// initGetWords();
		};

		this.removeAllListeners = () => {
			gameResult.closeResultWindow();
			document.removeEventListener('click', this.gameHandler);
			finishBtn.removeEventListener('click', this.resultBtnHandler);
			this.statisticBtn.removeEventListener('click', this.removeAllListeners);
			app.remove(wrapper);
		};

		this.resultBtnHandler = () => {

			const statisticBtn = newElem.create({
				elem: TAGS.BUTTON,
				classes: ['result__button', 'result__continue-btn', 'stat'],
				child: statisticText,
			});

			/* const newGameBtn = newElem.create({
				elem: TAGS.BUTTON,
				classes: ['result__button', 'result__continue-btn', 'new-btn'],
				child: newGameText,
			}); */

			this.statisticBtn = statisticBtn;
			this.statisticBtn.addEventListener('click', this.removeAllListeners); // перенаправить на станицу статистики

			// newGameBtn.addEventListener('click', this.startNewGame);

			gameResult.showResult({
				rightAnswers: correctAnswers,
				wrongAnswers: wrongAns,
				points: points.textContent,
				buttons: [statisticBtn,] // newGameBtn, ],
			});
		};

		this.compareWords = () => {

			const word = document.querySelector('.chosen');
			const transl = document.querySelector('.active');

			if (word !== null && transl !== null) {
				if (word.textContent === transl.dataset.word) {
					word.classList.add('invisible');
					transl.classList.add('invisible');
					word.classList.remove('chosen');
					transl.classList.remove('active');
					correctSound.play();
					wordlength -= 1;
					if (!word.classList.contains('wrong')) {
						points.textContent = +(points.textContent) + 100;
						correctAnswers.push(receivedWords[word.dataset.index]);
					}
					if (wordlength === 0) {
						this.resultBtnHandler();
					}

				} else {
					word.classList.remove('chosen');
					transl.classList.remove('active');
					word.classList.add('wrong');
					wrongAns.push(receivedWords[word.dataset.index]);
					wrongSound.play();
				}
			}
		};

		this.gameHandler = (event) => {
			if (event.target.classList.contains('word-our-game')) {
				if (event.target.classList.contains('chosen')) {
					event.target.classList.toggle('chosen');
				} else {
					[...engWords].forEach(el => {
						el.classList.remove('chosen');
						event.target.classList.add('chosen');
					});
					this.compareWords();
				}
			}

			if (event.target.classList.contains('word-translation-ourgame')) {
				if (event.target.classList.contains('active')) {
					event.target.classList.toggle('active');
				} else {
					[...translation].forEach(el => {
						el.classList.remove('active');
						event.target.classList.add('active');
					});
				}
				this.compareWords();
			}
		};

		this.startHandler = () => {
			points.classList.remove('none');
			gameContainer.classList.remove('none');
			document.addEventListener('click', this.gameHandler);
			finishBtn.addEventListener('click', this.resultBtnHandler);
			initGetWords();
		};
	}

	const ourGame = new GameHandlers();
	ourGame.startHandler();
}
