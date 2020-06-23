import { CARD_CONTAINER } from './CardConstants';
import WORDS_EVENTS from '../observer/WordsEvents';
import TrainState from './TrainState';

const globalState = new TrainState();

function correctAnswerHandler() {
	globalState.wasError = false;
	globalState.increasePosition();
	globalState.updateCard();
}

function errorAnswerHandler() {
	if (!globalState.wasError) {
		globalState.wasError = true;
		globalState.addCurrentWordToEnd();
	}
}

function addListeners() {
	document.addEventListener(WORDS_EVENTS.CORRECT_ANSWER, () =>
		correctAnswerHandler()
	);
	document.addEventListener(WORDS_EVENTS.INCORRECT_ANSWER, () =>
		errorAnswerHandler()
	);
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
}
