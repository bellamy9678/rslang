import {
	CARD_CONTAINER,
	INPUT_WIDTH_UNIT,
	DISPLAY_NONE_CLASS,
	HIDDEN_CLASS,
	FADE_CLASS,
	NEXT_AUDIO_CORRECTION,
	START_AUDIO_TIME,
	FADE_DURATION,
	DEFAULT_POSITION,
	PADDING_INPUT
} from './CardConstants';
import WORDS_EVENTS from '../observer/WordsEvents';
import GlobalState from './GlobalState';
import InputHandler from './InputHandler';
import Statistics from '../statistics/Statistics';
import eventObserver from '../observer/Observer';

let globalState;

function setInput() {
	globalState.inputHandler = new InputHandler();
	globalState.inputHandler.init();
	globalState.inputHandler.element.style.width = `${globalState.inputHandler.wordHidden.offsetWidth + PADDING_INPUT}${INPUT_WIDTH_UNIT}`;
}

function checkDifficulty() {
	const complexityGroup = document.querySelector('.button-group__complexity');
	if (!complexityGroup.classList.contains(DISPLAY_NONE_CLASS)) {
		complexityGroup.classList.remove(FADE_CLASS, HIDDEN_CLASS);
	}
}

function showTranslate() {
	const exampleTranslate = document.querySelector('#text-example-translate');
	const meaningTranslate = document.querySelector('#text-meaning-translate');
	if (!exampleTranslate.classList.contains(DISPLAY_NONE_CLASS)) {
		exampleTranslate.classList.remove(FADE_CLASS, HIDDEN_CLASS);
	}
	if (!meaningTranslate.classList.contains(DISPLAY_NONE_CLASS)) {
		meaningTranslate.classList.remove(FADE_CLASS, HIDDEN_CLASS);
	}
}

function playAudio(audioArr) {
	const playQueue = [];

	audioArr.forEach((audioElement) => {
		if (!audioElement.classList.contains(DISPLAY_NONE_CLASS)) {
			playQueue.push(audioElement);
		}
	});

	for (let i = 0; i < playQueue.length - NEXT_AUDIO_CORRECTION; i += 1) {
		playQueue[i].addEventListener('ended', () =>
			playQueue[i + NEXT_AUDIO_CORRECTION].play()
		);
	}

	if (playQueue[DEFAULT_POSITION]) {
		playQueue[DEFAULT_POSITION].play();
	}
}

function stopAllAudio() {
	const currentCard = globalState.getCurrentCard();

	currentCard.querySelector('#audio-word').pause();
	currentCard.querySelector('#audio-example').pause();
	currentCard.querySelector('#audio-meaning').pause();

	currentCard.querySelector('#audio-word').currentTime = START_AUDIO_TIME;
	currentCard.querySelector('#audio-example').currentTime = START_AUDIO_TIME;
	currentCard.querySelector('#audio-meaning').currentTime = START_AUDIO_TIME;
}

function checkAudio() {
	stopAllAudio();
	const currentCard = globalState.getCurrentCard();
	const audioWord = currentCard.querySelector('#audio-word');
	const audioExample = currentCard.querySelector('#audio-example');
	const audioMeaning = currentCard.querySelector('#audio-meaning');
	playAudio([audioWord, audioExample, audioMeaning]);
}

function showHiddenWordInInput() {
	const currentCard = globalState.getCurrentCard();
	const hiddenWord = currentCard.querySelector('#meaning-part-word');
	hiddenWord.innerText = hiddenWord.dataset.secretWord;
}

function nextCard() {
	Statistics.putWordsProgress();

	document.querySelector('.card').classList.add(FADE_CLASS);
	globalState.inputHandler.removeListener();
	globalState.increasePosition();

	let start = null;
	window.requestAnimationFrame(function timeout(timestamp) {
		if (start === null) {
			start = timestamp;
		}
		if (timestamp < FADE_DURATION + start) {
			window.requestAnimationFrame(timeout);
		} else {
			globalState.updateCard();
			if (globalState.currentPosition < globalState.cards.length) {
				setInput();
				document.querySelector('.card').classList.remove(FADE_CLASS);
			} else {
				globalState.finishGame();
				globalState = {};
			}
		}
	});
}

function checkHiddenFields() {
	showHiddenWordInInput();
	showTranslate();
	checkDifficulty();
}

function correctAnswerHandler(correctEvent) {
	document.querySelector('#word').disabled = true;
	if (
		globalState.pushedContinue ||
		document
			.querySelector('#complexity-buttons')
			.classList.contains(DISPLAY_NONE_CLASS)
	) {
		eventObserver.call(correctEvent);
		nextCard();
		globalState.pushedContinue = false;
	} else {
		checkHiddenFields();
		checkAudio();
	}
	globalState.wasError = false;
}

function errorAnswerHandler(incorrectEvent) {
	if (!globalState.wasError) {
		globalState.wasError = true;
		globalState.addCurrentWordToEnd();
		showTranslate();
	}
	eventObserver.call(incorrectEvent);
	globalState.inputHandler.showError();
	checkAudio();
}

function showAnswerHandler() {
	checkHiddenFields();
	checkAudio();
	globalState.addCurrentWordToEnd();
	globalState.pushedContinue = true;
	document.querySelector('#word').disabled = true;
}

function complexityButtonsHandler() {
	nextCard();
}

function removeWordHandler() {
	nextCard();
}

function againHandler() {
	globalState.addCurrentWordToEnd();
	nextCard();
}

function continueHandler() {
	if (document.querySelector('#word').disabled) {
		globalState.pushedContinue = true;
	}
}

function addListeners() {
	document.addEventListener(WORDS_EVENTS.PUSHED_CONTINUE, continueHandler);

	document.addEventListener(WORDS_EVENTS.CORRECT_ANSWER, correctAnswerHandler);
	document.addEventListener(WORDS_EVENTS.INCORRECT_ANSWER, errorAnswerHandler);
	document.addEventListener(WORDS_EVENTS.PUSHED_AGAIN, againHandler);
	document.addEventListener(WORDS_EVENTS.PUSHED_HARD, complexityButtonsHandler);
	document.addEventListener(WORDS_EVENTS.PUSHED_GOOD, complexityButtonsHandler);
	document.addEventListener(WORDS_EVENTS.PUSHED_EASY, complexityButtonsHandler);
	document.addEventListener(
		WORDS_EVENTS.PUSHED_REMOVE_FROM_DICTIONARY,
		removeWordHandler
	);
	document.addEventListener(
		WORDS_EVENTS.PUSHED_SHOW_ANSWER_BUTTON,
		showAnswerHandler
	);
}

function removeListeners() {
	document.removeEventListener(WORDS_EVENTS.PUSHED_CONTINUE, continueHandler);

	document.removeEventListener(
		WORDS_EVENTS.CORRECT_ANSWER,
		correctAnswerHandler
	);
	document.removeEventListener(
		WORDS_EVENTS.INCORRECT_ANSWER,
		errorAnswerHandler
	);
	document.removeEventListener(WORDS_EVENTS.PUSHED_AGAIN, againHandler);
	document.removeEventListener(
		WORDS_EVENTS.PUSHED_HARD,
		complexityButtonsHandler
	);
	document.removeEventListener(
		WORDS_EVENTS.PUSHED_GOOD,
		complexityButtonsHandler
	);
	document.removeEventListener(
		WORDS_EVENTS.PUSHED_EASY,
		complexityButtonsHandler
	);
	document.removeEventListener(
		WORDS_EVENTS.PUSHED_REMOVE_FROM_DICTIONARY,
		removeWordHandler
	);
	document.removeEventListener(
		WORDS_EVENTS.PUSHED_SHOW_ANSWER_BUTTON,
		showAnswerHandler
	);
}

function gameOverCallback() {
	removeListeners();
	CARD_CONTAINER.removeEventListener(
		WORDS_EVENTS.TRAINING_GAME_OVER,
		gameOverCallback
	);
}

CARD_CONTAINER.addEventListener(
	WORDS_EVENTS.TRAINING_GAME_OVER,
	gameOverCallback
);

export default async function training() {
	globalState = {};
	globalState = new GlobalState();
	await globalState.initGlobalState();
	if (globalState.words.length !== 0) {
		addListeners();
		setInput();
	}
}
