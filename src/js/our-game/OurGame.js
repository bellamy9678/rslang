import {
	// API,
	ASSETS_STORAGE
} from '../shared/Constants';

import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';

import renderWords from './RenderWords';

import renderTranslate from './RenderTranslate';

import shuffle from './Helper';

import initMain from './GamePage';

// import initStartPage from './StartPage';
import Service from '../words_service/Service';

import Result from '../game_result/Result';

import {
	emptyString,
	statisticText,
	newGameText
} from './OurGameConsts';

import createHeader from './GameHeader';

// async function getData(url) {
// 	const response = await fetch(url);
// 	const data = await response.json();
// 	return data;
// }

// Эта функция Лизы, мне нужно импорт из какого-то ее файла добавить
// function Word(word) {
// 	this.id = word.id;
// 	this.word = word.word;
// 	this.translate = word.wordTranslate;
// 	this.transcription = word.transcription;
// 	this.audio = `${ASSETS_STORAGE}${word.audio}`;
// 	this.image = `${ASSETS_STORAGE}${word.image}`;
// 	this.example = word.textExample;
// 	this.exampleTranslate = word.textExampleTranslate;
// 	this.exampleAudio = `${ASSETS_STORAGE}${word.audioExample}`;
// }

function GetAnswers(item) {
	this.word = item.textContent;
	this.wordTranslate = item.dataset.translation;
	this.transcription = item.dataset.transcription;
	this.audio = item.dataset.sound.replace(ASSETS_STORAGE, emptyString);
}

async function getWords() {
	const {
		repeatWords,
		level,
		round
	} = JSON.parse(localStorage.getItem('gameData'));
	if (repeatWords === true) {
		const userWords = await Service.getRepeatedWords();
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


	const startPage = document.querySelector('.start-page');
	const gameContainer = document.getElementById('game-cont');
	const engWordsContainer = document.getElementById('eng-container');
	const translationContainer = document.getElementById('transl-container');
	const engWords = document.getElementsByClassName('word');
	const startBtn = document.querySelector('.start-btn');
	const finishBtn = document.getElementById('finish');
	const translation = document.getElementsByClassName('word-translation');
	const points = document.getElementById('game-points');
	const gameResult = new Result();
	const correctSound = new Audio('https://raw.githubusercontent.com/garza0/rslang-data/master/correct.mp3');
	const wrongSound = new Audio('https://raw.githubusercontent.com/garza0/rslang-data/master/wrong.mp3');
	const guessed = [];
	const zero = 0;
	points.textContent = zero;
	let wordsNumber = 15;


	function initGetWords() {
		// const level = document.getElementById('level').value || 0;
		// const round = document.getElementById('round').value  || 0;
		getWords().then(res => {
			let words = res.slice(zero, wordsNumber).map(item => renderWords(item));
			words = shuffle(words);
			words.forEach(el => engWordsContainer.append(el));

			let translations = res.slice(0, 15).map(item => renderTranslate(item));
			translations = shuffle(translations);
			translations.forEach(el => translationContainer.append(el));
		});
	}


	function GameHandlers() {


		this.startNewGame = () => {
			gameResult.closeResultWindow();
			startPage.classList.remove('none');
			points.classList.add('none');
			gameContainer.classList.add('none');
			[...engWords].forEach(el => el.remove());
			[...translation].forEach(el => el.remove());
			points.textContent = '0';
			guessed.length = zero;
			initGetWords();
		};

		this.removeAllListeners = () => {
			gameResult.closeResultWindow();
			startBtn.removeEventListener('click', this.startHandler);
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

			const newGameBtn = newElem.create({
				elem: TAGS.BUTTON,
				classes: ['result__button', 'result__continue-btn', 'new-btn'],
				child: newGameText,
			});

			this.statisticBtn = statisticBtn;
			this.statisticBtn.addEventListener('click', this.removeAllListeners); // перенаправить на станицу статистики

			newGameBtn.addEventListener('click', this.startNewGame);

			gameResult.showResult({
				rightAnswers: guessed.map(item => new GetAnswers(item)),
				wrongAnswers: ([...engWords].filter((item) => (!guessed.includes(item)))).map(item => new GetAnswers(item)),
				points: points.textContent,
				buttons: [newGameBtn, statisticBtn],
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
					wordsNumber -= 1;
					if (!word.classList.contains('wrong')) {
						points.textContent = +(points.textContent) + 100;
						guessed.push(word);
					}
					if (wordsNumber === zero) {
						this.resultBtnHandler();
					}

				} else {
					word.classList.remove('chosen');
					transl.classList.remove('active');
					word.classList.add('wrong');
					wrongSound.play();
				}
			}
		};


		this.gameHandler = (event) => {
			if (event.target.classList.contains('word')) {
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

			if (event.target.classList.contains('word-translation')) {
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


		this.gameHandler = (event) => {
			if (event.target.classList.contains('word')) {
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

			if (event.target.classList.contains('word-translation')) {
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
			// startPage.classList.add('none');
			points.classList.remove('none');
			gameContainer.classList.remove('none');
			document.addEventListener('click', this.gameHandler);
			finishBtn.addEventListener('click', this.resultBtnHandler);
			initGetWords();
		};

		// this.addAllListeners = () => {
		// 	startBtn.addEventListener('click', this.startHandler);
		// };
	}

	const ourGame = new GameHandlers();
	ourGame.startHandler();
}
