import GameField from './GameField';
import * as CONST from './constants';
import Result from '../game_result/Result';
import DOMElementCreator from '../utils/DOMElementCreator';
import * as TAGS from '../shared/Tags.json';
import { GAMES_NAMES } from '../statistics/constants';
import Statistics from '../statistics/Statistics';
import Service from '../words_service/Service';
import CloseGame from '../close_game/CloseGame';

const closeGame = new CloseGame();
const factory = new DOMElementCreator();
const result = new Result();

export default class SprintGame {
	constructor() {
		this.level = JSON.parse(localStorage.getItem('gameData')).level - 1;
		this.round = JSON.parse(localStorage.getItem('gameData')).round - 1;
		this.repeatWords = JSON.parse(localStorage.getItem('gameData')).repeatWords;
		this.nextLevel = this.level + 1;
		this.nextRound = this.round + 1;
		this.gameLevel = 0;
		this.wordIndex = 0;
		this.wordsArr = [];
		this.wrongWords = [];
		this.pointsForAnswer = 10;
		this.rightTranslate = false;
		this.rightAnswers = [];
		this.wrongAnswers = [];
		this.points = 0;
		this.rightAnswersInRow = 0;
		this.playAudioState = false;
		this.audio = new Audio();
		this.gameStarted = false;
		this.keyUpState = true;
		this.gameReadyState = false;
		this.wordShowed = false;
	}

	init() {
		GameField.generateField();
		this.MAIN_CONTAINER = document.getElementById('main_container');
		this.WORD_CONTAINER = document.getElementById('word');
		this.TRANSLATION_CONTAINER = document.getElementById('translation');
		this.WRONG_BTN = document.getElementById('wrongBtn');
		this.CORRECT_BTN = document.getElementById('correctBtn');
		this.WRONG_INDICATOR = document.getElementById('wrong');
		this.RIGHT_INDICATOR = document.getElementById('correct');
		this.AUDIO_BTN = document.getElementById('audio');
		this.SCORE_CONTAINER = document.getElementById('score');
		this.SUBLEVEL_DOTS = document.querySelectorAll('.sublevel__dot');
		this.POINTS_FOR_WORD_CONTAINER = document.getElementById('points_for_word');
		this.LEVEL_STARS = document.querySelectorAll('.level_star');
		this.SUBLEVEL = document.getElementById('sublevel');
		this.TIMER = document.getElementById('timer');

		this.addEventListeners();
	}

	start() {
		this.init();
		if (this.repeatWords) {
			this.loadUserWords();
		} else {
			this.getData();
		}
	}

	addEventListeners() {
		this.wrongBtnHand = this.wrongBtnHandler.bind(this);
		this.correctBtnHand = this.correctBtnHandler.bind(this);
		this.audioBtnHand = this.audioBtnHandler.bind(this);

		this.WRONG_BTN.addEventListener('click', this.wrongBtnHand);
		this.CORRECT_BTN.addEventListener('click', this.correctBtnHand);
		this.AUDIO_BTN.addEventListener('click', this.audioBtnHand);

		this.keyboardHandler = this.keyEventHandler.bind(this);
		document.addEventListener('keydown', this.keyboardHandler);
		this.keyUp = this.keyUpHandler.bind(this);
		document.addEventListener('keyup', this.keyUp);

		this.exitGameHand = this.exitGameHandler.bind(this);
		closeGame.addEventListenerToDocument(this.exitGameHand);
	}

	exitGameHandler() {
		this.removeEventListeners();
		this.resetGame();
	}

	removeEventListeners() {
		this.WRONG_BTN.removeEventListener('click', this.wrongBtnHand);
		this.CORRECT_BTN.removeEventListener('click', this.correctBtnHand);
		this.AUDIO_BTN.removeEventListener('click', this.audioBtnHand);
		document.removeEventListener('keydown', this.keyboardHandler);
		document.removeEventListener('keyup', this.keyUp);
	}

	audioBtnHandler() {
		this.playAudioState = !this.playAudioState;
		if (this.playAudioState) {
			this.AUDIO_BTN.classList.add('main__play_audio_btn--active');
		} else {
			this.AUDIO_BTN.classList.remove('main__play_audio_btn--active');
		}
	}

	keyEventHandler(event) {
		if (this.gameReadyState && this.keyUpState) {
			if (event.keyCode === 37) {
				this.keyUpState = false;
				this.WRONG_BTN.click();
			}
			if (event.keyCode === 39) {
				this.keyUpState = false;
				this.CORRECT_BTN.click();
			}
		}
	}

	keyUpHandler(event) {
		if (event.keyCode === 37 || event.keyCode === 39) {
			this.keyUpState = true;
		}
	}

	wrongBtnHandler() {
		if (this.gameReadyState) {
			if (this.gameStarted === false) {
				this.startCountdown();
				this.gameStarted = true;
			}

			if (this.rightTranslate) {
				this.wrongAnswerHandler();

			} else {
				this.correctAnswerHandler();

			}
		}
	}

	correctBtnHandler() {
		if (this.gameReadyState) {
			if (this.gameStarted === false) {
				this.startCountdown();
				this.gameStarted = true;
			}
			if (this.rightTranslate && this.wordShowed) {
				this.correctAnswerHandler();
			} else if (!this.rightTranslate && this.wordShowed) {
				this.wrongAnswerHandler();
			}
		}
	}

	opacityInOut(elem, shadow) {
		const curElem = elem;
		curElem.style.opacity = '1';
		this.MAIN_CONTAINER.style.boxShadow = shadow;
		setTimeout(() => {
			curElem.style.opacity = '0';
			this.MAIN_CONTAINER.style.boxShadow = CONST.MAIN_SHADOW_DEFAUlT;
		}, 400);
	}

	wrongAnswerHandler() {
		this.opacityInOut(this.WRONG_INDICATOR, CONST.MAIN_SHADOW_WRONG);
		CONST.WRONG_AUDIO.play();
		this.SUBLEVEL_DOTS.forEach(el => el.classList.remove('sublevel__dot--right'));
		this.pointsForAnswer = 10;
		this.rightAnswersInRow = 0;
		this.gameLevel = 0;
		this.POINTS_FOR_WORD_CONTAINER.innerText = '';
		this.SUBLEVEL.classList.remove('sublevel--active');
		this.SUBLEVEL.style.backgroundColor = 'unset';
		this.wrongAnswers.push(this.wordsArr[this.wordIndex]);
		this.LEVEL_STARS.forEach(star => star.classList.add('none'));
		this.loadNextRound();
	}


	correctAnswerHandler() {
		this.opacityInOut(this.RIGHT_INDICATOR, CONST.MAIN_SHADOW_RIGHT);
		CONST.CORRECT_AUDIO.play();
		this.showSublevel();
		this.points += this.pointsForAnswer;
		this.rightAnswers.push(this.wordsArr[this.wordIndex]);
		this.updateScore();
		this.loadNextRound();
	}

	showSublevel() {
		if (this.rightAnswersInRow < 3) {
			this.SUBLEVEL_DOTS[this.rightAnswersInRow].classList.add('sublevel__dot--right');
		}
		this.rightAnswersInRow += 1;
		if (this.rightAnswersInRow > 3 && this.pointsForAnswer < 80) {
			this.LEVEL_STARS[this.gameLevel].classList.remove('none');
			this.SUBLEVEL.classList.add('sublevel--active');

			this.gameLevel += 1;
			this.rightAnswersInRow = 0;
			if (this.pointsForAnswer < 40) {
				this.SUBLEVEL_DOTS.forEach(el => el.classList.remove('sublevel__dot--right'));
			}
			this.pointsForAnswer *= 2;
			if (this.pointsForAnswer === 20) {
				this.SUBLEVEL.style.backgroundColor = CONST.LEVEL_YELLOW;
				this.SUBLEVEL.style.color = 'black';
			} else if (this.pointsForAnswer === 40) {
				this.SUBLEVEL.style.backgroundColor = CONST.LEVEL_BRONSE;
				this.SUBLEVEL.style.color = 'white';
			} else if (this.pointsForAnswer === 80) {
				this.SUBLEVEL.style.backgroundColor = CONST.LEVEL_RED;
			}
			this.POINTS_FOR_WORD_CONTAINER.innerText = `+${this.pointsForAnswer} ${CONST.POINTS_FOR_ANSWER_TEXT}`;
		}
	}

	updateScore() {
		this.SCORE_CONTAINER.innerText = this.points;
	}

	loadNextRound() {
		this.wordIndex += 1;
		this.wrongWords.splice(0, 1);
		this.showWord();
		if (this.repeatWords && this.wrongWords.length === 1) {
			console.log('В вашем словаре больше нету слов. Показать результат. - кнопка');
		} else if (this.wrongWords.length < 5 && !this.repeatWords) {
			this.loadNextWords(this.level, this.nextRound);
		}
	}

	notEnoughWordsHandler(numberOfWords) {
		console.log(`You have ${numberOfWords || 0} words. You need more than 10 words. Add them in training mode.`);
		this.nothing = false;
	}

	loadNextWords(nextLevel, nextRound) {
		new Promise(resolve => {
			const allWords = Service.getGameSpecificWords(nextLevel, nextRound);
			resolve(allWords);
		})
			.then(allWords => {
				console.log(allWords);
				if (allWords.length === 0) {
					this.notEnoughWordsHandler();
				};

				allWords.forEach(wordObj => this.wordsArr.push(wordObj));
				this.getWrongWordsArr(allWords);
				this.nextRound += 1;
			}).catch(error => console.error(error.message));
	}

	async getWords() {
		this.nothing = false;
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

	async loadUserWords() {
		this.handleJson(await this.getWords());
	}

	getData(level = this.level, round = this.round) {
		new Promise(resolve => {
			const allWords = Service.getGameSpecificWords(level, round);
			resolve(allWords);
		}).then(allWords => {
			console.log(allWords);
			this.handleJson(allWords);
		}).catch(error => console.error(error));
	}

	handleJson(json) {
		this.wordsArr = json;
		this.getWrongWordsArr(json);
		this.showWord();
		this.gameReadyState = true;
	}

	getWrongWordsArr(json) {
		for (let i = 0; i < json.length; i += 1) {
			if (i !== this.wordIndex) {
				this.wrongWords.push(json[i].translate);
			}
		}
	}

	showWord() {
		this.wordShowed = false;
		if (this.wordsArr[this.wordIndex]) {
			this.WORD_CONTAINER.innerText = this.wordsArr[this.wordIndex].word;
			this.showTranslate();
			this.wordShowed = true;
			if (this.playAudioState) {
				this.audio = new Audio(`${this.wordsArr[this.wordIndex].audio}`);
				this.audio.play();
			}
		} else {
			console.log(this.wordsArr[this.wordIndex], this.wordsArr, this.wordIndex, this.wordShowed);

		}
	}

	static returnRandomFromArr(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	showTranslate() {
		const random = Math.random().toFixed(2);

		if (random < CONST.CHANCE) {
			this.rightTranslate = true;
			this.TRANSLATION_CONTAINER.innerText = this.wordsArr[this.wordIndex].translate;
		} else {
			this.rightTranslate = false;
			this.TRANSLATION_CONTAINER.innerText = SprintGame.returnRandomFromArr(this.wrongWords);
		}

	}

	tick() {
		const timeDisplay = document.getElementById('time');
		let sec = this.secondsRemaining;
		window.requestAnimationFrame(this.animationStep.bind(this));

		if (sec < 10) {
			sec = `0${sec}`;
		}

		timeDisplay.innerText = sec;
		if (this.secondsRemaining === 0) {
			clearInterval(this.intervalHandle);
			this.stopGame();
		}

		this.secondsRemaining -= 1;
	}

	animationStep() {
		const shadowTimer = CONST.SHADOW_TIMER.split(' ');
		shadowTimer[4] = `${(60 - this.secondsRemaining) / 2 + 3}px`;
		const shadow = shadowTimer.join(' ');
		this.TIMER.style.boxShadow = shadow;

		if (this.secondsRemaining > 0) {
			window.requestAnimationFrame(this.animationStep.bind(this));
		}
	}

	startCountdown() {
		this.secondsRemaining = 60;
		this.intervalHandle = setInterval(this.tick.bind(this), 1000);
	}

	resetGame() {
		clearInterval(this.intervalHandle);
	}

	startNextGame() {
		this.resetGame();
		this.points = 0;
		this.rightAnswers = [];
		this.wrongAnswers = [];
		this.rightAnswersInRow = 0;
		this.pointsForAnswer = 10;
		this.gameLevel = 0;
		this.secondsRemaining = 60;
		this.gameStarted = false;
		this.SUBLEVEL_DOTS.forEach(el => el.classList.remove('sublevel__dot--right'));
		this.LEVEL_STARS.forEach(star => star.classList.add('none'));
		this.POINTS_FOR_WORD_CONTAINER.innerText = '';
		this.SUBLEVEL.classList.remove('sublevel--active');
		this.SUBLEVEL.style.backgroundColor = 'unset';
		this.TIMER.style.boxShadow = 'none';
		this.updateScore();
		this.loadNextRound();
	}

	stopGame() {
		this.resultContinueBtn = factory.create({
			elem: TAGS.BUTTON,
			classes: ['result__button', 'result__continue-btn'],
			child: CONST.CONTINUE_BTN_TEXT
		});
		this.closeResult = this.resultBtnHandler.bind(this);
		this.resultContinueBtn.addEventListener('click', this.closeResult);

		this.resultExitBtn = factory.create({
			elem: TAGS.BUTTON,
			classes: ['result__button', 'result__exit-btn'],
			child: CONST.EXIT_BTN_TEXT
		});
		this.exitGameResult = this.resultExitBtnHandler.bind(this);
		this.resultExitBtn.addEventListener('click', this.exitGameResult);

		const resultPoints = {
			name: GAMES_NAMES.SPRINT,
			result: this.points,
		};
		Statistics.putGamesResult(resultPoints);

		console.log(this.rightAnswers, this.wrongAnswers);
		result.showResult({
			rightAnswers: this.rightAnswers,
			wrongAnswers: this.wrongAnswers,
			buttons: [this.resultContinueBtn, this.resultExitBtn],
			points: this.points
		});
	}

	resultExitBtnHandler() {
		result.closeResultWindow.call(result);
		this.removeEventListeners();
		this.resultContinueBtn.removeEventListener('click', this.closeResult);
		this.resultExitBtn.removeEventListener('click', this.exitGameResult);
		// showMainPage();

	}

	resultBtnHandler() {
		result.closeResultWindow.call(result);
		this.resultContinueBtn.removeEventListener('click', this.closeResult);
		this.resultExitBtn.removeEventListener('click', this.exitGameResult);
		this.startNextGame();

	}
}
