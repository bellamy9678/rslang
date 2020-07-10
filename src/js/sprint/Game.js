import GameField from './GameField';
import * as CONST from './constants';
import { API, ASSETS_STORAGE } from '../shared/Constants';
import Result from '../game_result/Result';
import DOMElementCreator from '../utils/DOMElementCreator';
import * as TAGS from '../shared/Tags.json';
import { GAMES_NAMES } from '../statistics/constants';
import Statistics from '../statistics/Statistics';

const factory = new DOMElementCreator();
const result = new Result();

export default class Game {
	constructor() {
		this.level = 0;
		this.round = 0;
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
		this.pointsForAnswer = 10;
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
		this.getData();
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
		// eslint-disable-next-line no-param-reassign
		elem.style.opacity = '1';
		this.MAIN_CONTAINER.style.boxShadow = shadow;
		setTimeout(() => {
			// eslint-disable-next-line no-param-reassign
			elem.style.opacity = '0';
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
		if (this.wrongWords.length < 5) {
			this.loadNextWords(this.level, this.nextRound);
		}
	}

	loadNextWords(nextLevel, nextRound) {
		const url = `${API}words?group=${nextLevel}&page=${nextRound}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
		fetch(url)
			.then(response => {
				return response.json();
			}).then(myJson => {
				myJson.forEach(wordObj => this.wordsArr.push(wordObj));
				this.getWrongWordsArr(myJson);
				this.nextRound += 1;
			}).catch(error => console.error(error));
	}

	getData(level = this.level, round = this.round) {
		const url = `${API}words?group=${level}&page=${round}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
		fetch(url)
			.then(response => {
				return response.json();
			}).then(myJson => {
				this.handleJson(myJson);
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
				this.wrongWords.push(json[i].wordTranslate);
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
				this.audio = new Audio(`${ASSETS_STORAGE}${this.wordsArr[this.wordIndex].audio}`);
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
			this.TRANSLATION_CONTAINER.innerText = this.wordsArr[this.wordIndex].wordTranslate;
		} else {
			this.rightTranslate = false;
			this.TRANSLATION_CONTAINER.innerText = Game.returnRandomFromArr(this.wrongWords);
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

	stopGame() {
		this.resultContinueBtn = factory.create({
			elem: TAGS.BUTTON,
			classes: ['result__button', 'result__continue-btn'],
			child: CONST.CONTINUE_BTN_TEXT
		});
		this.closeResult = Game.resultBtnHandler.bind(this);
		this.resultContinueBtn.addEventListener('click', this.closeResult);

		const resultPoints = {
			name: GAMES_NAMES.SPRINT,
			result: this.points,
		};
		Statistics.putGamesResult(resultPoints);

		result.showResult({
			rightAnswers: this.rightAnswers,
			wrongAnswers: this.wrongAnswers,
			buttons: [this.resultContinueBtn],
			points: this.points
		});
		this.removeEventListeners();
	}

	static resultBtnHandler() {
		result.closeResultWindow.call(result);
		this.resultContinueBtn.removeEventListener('click', this.closeResult);
	}



}
