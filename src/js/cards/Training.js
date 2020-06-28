import {
	CARD_CONTAINER,
	INPUT_WIDTH_CORRECTION,
	INPUT_WIDTH_UNIT,
	DISPLAY_NONE_CLASS,
	HIDDEN_CLASS,
	FADE_CLASS,
} from './CardConstants';
import WORDS_EVENTS from '../observer/WordsEvents';
import TrainState from './TrainState';
import InputHandler from './InputHandler';
import TranslateHandler from './TranslateHandler';

const globalState = new TrainState();

function input() {
	globalState.inputHandler = new InputHandler();
	globalState.inputHandler.element.style.width = `${
		globalState.inputHandler.wordHidden.offsetWidth + INPUT_WIDTH_CORRECTION
	}${INPUT_WIDTH_UNIT}`;
	globalState.inputHandler.wordHidden.classList.add(HIDDEN_CLASS);
}

function checkDifficulty() {
	const complexityGroup = document.querySelector('.button-group__complexity');
	if (!complexityGroup.classList.contains(DISPLAY_NONE_CLASS)) {
		complexityGroup.classList.remove(HIDDEN_CLASS);
	}
}

function showTranslate() {
	const translateHandler = new TranslateHandler();
	translateHandler.checkMeaning();
	translateHandler.checkExample();
}

function correctAnswerHandler() {
	globalState.wasError = false;
	globalState.increasePosition();
	document.querySelector('.card').classList.add(FADE_CLASS);
	checkDifficulty();

	setTimeout(() => {
		globalState.updateCard();
		document.querySelector('.card').classList.remove(FADE_CLASS);
		input();
	}, 500);
}

function errorAnswerHandler() {
	if (!globalState.wasError) {
		globalState.wasError = true;
		globalState.addCurrentWordToEnd();
		showTranslate();
	}
	globalState.inputHandler.showError();
}

function againHandler() {
	globalState.addCurrentWordToEnd();
}

function addListeners() {
	document.addEventListener(WORDS_EVENTS.CORRECT_ANSWER, correctAnswerHandler);
	document.addEventListener(WORDS_EVENTS.INCORRECT_ANSWER, errorAnswerHandler);
	document.addEventListener(WORDS_EVENTS.PUSHED_AGAIN, againHandler);
}

function removeListeners() {
	document.removeEventListener(
		WORDS_EVENTS.CORRECT_ANSWER,
		correctAnswerHandler
	);
	document.removeEventListener(
		WORDS_EVENTS.INCORRECT_ANSWER,
		errorAnswerHandler
	);
}

CARD_CONTAINER.addEventListener(WORDS_EVENTS.TRAINING_GAME_OVER, () =>
	removeListeners()
);

export default async function training() {
	await globalState.initGlobalState();
	addListeners();
	input();
}
