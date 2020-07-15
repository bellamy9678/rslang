import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';
import initMainContent from './MainContent';
import renderWords from './RenderWords';
import Result from '../game_result/Result';
import { GAMES_NAMES, RESULT_MULTIPLIER } from '../statistics/constants';
import Statistics from '../statistics/Statistics';

import {
	returnBtnText,
	statisticText,
	emptyString,
} from './speakconst';
import Service from '../words_service/Service';

export default function createSpeakItGame() {
	// Creat DOM
	const app = document.querySelector('.app');
	const newElem = new DOMElementCreator();
	const wrapper = newElem.create({
		elem: TAGS.DIV,
		classes: ['wrapper', 'speakit__wrapper'],
		child: initMainContent(),
	});

	app.append(wrapper);
	document.body.classList.add('speakit__body');

	const mainWrapper = document.querySelector('.main-container');
	const currentImg = document.querySelector('.current-image');
	const translation = document.querySelector('.current-transl');
	const wordsContainer = document.querySelector('.words-container');
	const imgAudio = document.querySelector('.pronounce');
	const output = document.querySelector('.word-output');
	const stopSpeak = document.querySelector('.stop-speak');
	const restartBtn = document.querySelector('.restart');
	const speakBtn = document.querySelector('.speak');
	const finishBtn = document.querySelector('.finish');
	const words = document.getElementsByClassName('word');
	const defaultImg = './assets/images/eng.jpg';
	const language = 'en-US';
	const span = document.createElement('span');
	output.appendChild(span);
	const myResult = new Result();
	const guessed = [];
	let trainMode = true;
	const zero = 0;
	const guessedAll = 10;
	let receivedWords = [];
	const corrAnsw = [];
	let wordsNumber;

	// Speech recognition
	const SpeechRecognition = window.webkitSpeechRecognition;
	const recognition = new SpeechRecognition();
	recognition.interimResults = true;
	recognition.lang = language;

	// words
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

	// Events
	function setDefaultState() {
		const { level } = JSON.parse(localStorage.getItem('gameData'));
		const { round } = JSON.parse(localStorage.getItem('gameData'));
		guessed.length = zero;
		corrAnsw.length = zero;
		trainMode = true;
		span.textContent = emptyString;
		output.classList.add('none');
		currentImg.setAttribute('src', defaultImg);
		translation.textContent = emptyString;
		if (speakBtn.hasAttribute('disabled')) {
			speakBtn.removeAttribute('disabled');
		};
		[...words].forEach((el) => el.remove());
		getWords(level, round).then((res) => {
			const neededWords = res.slice(zero, guessedAll);
			receivedWords = [...neededWords];
			wordsNumber = receivedWords.length;
			const arr = neededWords.map((item, index) => renderWords(item, index));
			arr.forEach((el) => wordsContainer.append(el));
		});
	}

	/* function setStartingState() {
		guessed.length = zero;
		corrAnsw = zero;
		trainMode = true;
		span.textContent = emptyString;
		output.classList.add('none');
		currentImg.setAttribute('src', defaultImg);
		translation.textContent = emptyString;
		[...words].forEach((el) => el.remove());
	} */

	function GameHandlers() {

		this.clickHandler = (event) => {
			if (event.target.classList.contains('word') && trainMode) {
				const translateText = event.target.dataset.transl;
				const wordSrc = event.target.dataset.myimage;
				const wordAudio = event.target.dataset.myaudio;
				translation.innerText = translateText;
				currentImg.setAttribute('src', wordSrc);
				imgAudio.setAttribute('src', wordAudio);
				imgAudio.play();
				[...words].forEach((el) => el.classList.remove('active'));
				event.target.classList.add('active');
			}
			// sound on word click
			if (event.target.parentElement.classList.contains('word') && trainMode) {
				const translateText = event.target.parentElement.dataset.transl;
				const wordSrc = event.target.parentElement.dataset.myimage;
				const wordAudio = event.target.parentElement.dataset.myaudio;
				translation.innerText = translateText;
				currentImg.setAttribute('src', wordSrc);
				imgAudio.setAttribute('src', wordAudio);
				imgAudio.play();
				[...words].forEach((el) => el.classList.remove('active'));
				event.target.parentElement.classList.add('active');
			}
		};

		// statistic btn remove all listeners
		this.statisticHandler = () => {
			document.removeEventListener('click', this.clickHandler);
			restartBtn.removeEventListener('click', this.restartHandler);
			speakBtn.removeEventListener('click', this.startSpeakHandler);
			stopSpeak.removeEventListener('click', this.stopSpeakHandler);
			finishBtn.removeEventListener('click', this.resultBtnHandler);
			recognition.stop();
			recognition.removeEventListener('result', this.recResultHandler);
			recognition.removeEventListener('end', this.handleRecognition);
			this.returnButton.removeEventListener('click', this.returnHandler);
			this.statButton.removeEventListener('click', this.statisticHandler);
			app.remove(wrapper);
		};
		// return btn
		this.returnHandler = () => {
			myResult.closeResultWindow();
		};
		// new game button
		/* this.newGameHandler = () => {
			myResult.closeResultWindow();
			setStartingState();
			recognition.stop();
			mainWrapper.classList.add('none');
		}; */

		// speech
		this.handleRecognition = () => {
			[...words].forEach((el) => {
				if (
					el.querySelector('.word-writing').textContent.toLowerCase() ===
					span.textContent.toLowerCase()
				) {
					if (!guessed.includes(el)) {
						el.classList.add('active');
						currentImg.setAttribute('src', el.dataset.myimage);
						guessed.push(el);
						corrAnsw.push((receivedWords[el.dataset.index]));
						if (corrAnsw.length === wordsNumber) {
							this.resultBtnHandler(); // нужно вызывать модальное окошко потому что все угадано
						}
					}
				}
			});

			recognition.start();
		};

		this.recResultHandler = (e) => {
			const last = e.results.length - 1;
			const command = e.results[last][zero].transcript;
			span.textContent = emptyString;
			span.textContent = command;
		};

		// restart btn
		this.restartHandler = () => {
			setDefaultState();
			recognition.stop();
			recognition.removeEventListener('result', this.recResultHandler);
			recognition.removeEventListener('end', this.handleRecognition);
		};

		// start speak button
		this.startSpeakHandler = () => {
			trainMode = false;
			output.classList.remove('none');
			[...words].forEach((el) => el.classList.remove('active'));
			translation.classList.add('none');
			recognition.start();
			recognition.addEventListener('result', this.recResultHandler);
			recognition.addEventListener('end', this.handleRecognition);
			speakBtn.setAttribute('disabled', 'true');
		};

		// stop speak button
		this.stopSpeakHandler = () => {
			recognition.stop();
			recognition.removeEventListener('result', this.recResultHandler);
			recognition.removeEventListener('end', this.handleRecognition);
			output.classList.add('none');
			span.textContent = emptyString;
			currentImg.setAttribute('src', defaultImg);
			[...words].forEach((el) => el.classList.remove('active'));
			trainMode = true;
			translation.classList.remove('none');
			translation.textContent = emptyString;
			speakBtn.removeAttribute('disabled');
		};

		// start game add all listeners
		this.startHandler = () => {
			mainWrapper.classList.remove('none');
			recognition.removeEventListener('end', this.handleRecognition);
			const { level } = JSON.parse(localStorage.getItem('gameData'));
			const { round } = JSON.parse(localStorage.getItem('gameData'));
			getWords(level, round).then((res) => {
				const neededWords = res.slice(zero, guessedAll);
				receivedWords = [...neededWords];
				wordsNumber = receivedWords.length;
				const arr = neededWords.map((item, index) => renderWords(item, index));
				arr.forEach((el) => wordsContainer.append(el));
			});
			document.addEventListener('click', this.clickHandler);
			restartBtn.addEventListener('click', this.restartHandler);
			speakBtn.addEventListener('click', this.startSpeakHandler);
			stopSpeak.addEventListener('click', this.stopSpeakHandler);
			finishBtn.addEventListener('click', this.resultBtnHandler);
			// }
		};

		// modal window
		this.resultBtnHandler = () => {
			const resultReturnBtn = newElem.create({
				elem: TAGS.BUTTON,
				classes: ['result__button', 'result__continue-btn', 'return-btn'],
				child: returnBtnText,
			});

			/* const resultNewGameBtn = newElem.create({
				elem: TAGS.BUTTON,
				classes: ['result__button', 'result__continue-btn', 'new-game'],
				child: newGameText,
			}); */

			const statisticBtn = newElem.create({
				elem: TAGS.BUTTON,
				classes: ['result__button', 'result__continue-btn', 'statistic'],
				child: statisticText,
			});


			this.returnButton = resultReturnBtn;

			statisticBtn.addEventListener('click', this.statisticHandler); // дописать метод, показывающий статистику по игре);
			resultReturnBtn.addEventListener('click', this.returnHandler);
			// resultNewGameBtn.addEventListener('click', this.newGameHandler);

			this.returnButton = resultReturnBtn;
			this.statButton = statisticBtn;


			const resultPoints = {
				name: GAMES_NAMES.SPEAK,
				result:
				corrAnsw.length * RESULT_MULTIPLIER.CORRECT +
				receivedWords.filter((item) => (!corrAnsw.includes(item))).length * RESULT_MULTIPLIER.INCORRECT,
			};
			Statistics.putGamesResult(resultPoints);

			myResult.showResult({
				rightAnswers: corrAnsw,
				wrongAnswers: receivedWords
					.filter((item) => !corrAnsw.includes(item)),
				buttons: [resultReturnBtn, statisticBtn ] // resultNewGameBtn, ],
			});
		};
	}

	const speakHandlers = new GameHandlers();
	speakHandlers.startHandler();
}
