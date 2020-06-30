import {
	CARD_CONTAINER,
	INPUT_WIDTH_UNIT,
	DISPLAY_NONE_CLASS,
	HIDDEN_CLASS,
	FADE_CLASS,
} from './CardConstants';
import WORDS_EVENTS from '../observer/WordsEvents';
import GlobalState from './GlobalState';
import InputHandler from './InputHandler';

const globalState = new GlobalState();

function setInput() {
	globalState.inputHandler = new InputHandler();
	globalState.inputHandler.element.style.width = `${globalState.inputHandler.wordHidden.offsetWidth}${INPUT_WIDTH_UNIT}`;
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
	for (let i = 0; i < playQueue.length - 1; i += 1) {
		playQueue[i].addEventListener('ended', () => playQueue[i + 1].play());
	}
	if (playQueue.length > 0) {
		playQueue[0].play();
	}
}

function stopAllAudio() {
	const currentCard = globalState.getCurrentCard();

	currentCard.querySelector('#audio-word').pause();
	currentCard.querySelector('#audio-example').pause();
	currentCard.querySelector('#audio-meaning').pause();

	currentCard.querySelector('#audio-word').currentTime = 0.0;
	currentCard.querySelector('#audio-example').currentTime = 0.0;
	currentCard.querySelector('#audio-meaning').currentTime = 0.0;
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
	document.querySelector('.card').classList.add(FADE_CLASS);
	globalState.increasePosition();
	setTimeout(() => {
		globalState.updateCard();
		if (globalState.currentPosition < globalState.cards.length) {
			setInput();
			document.querySelector('.card').classList.remove(FADE_CLASS);
		} else {
			globalState.finishGame();
		}
	}, 500);
}

function checkHiddenFields() {
	showHiddenWordInInput();
	showTranslate();
	checkDifficulty();
}

function correctAnswerHandler() {
	if (globalState.pushedContinue) {
		nextCard();
		globalState.pushedContinue = false;
	} else {
		globalState.wasError = false;
		globalState.pushedContinue = true;
		checkHiddenFields();
		checkAudio();
	}
}

function errorAnswerHandler() {
	if (!globalState.wasError) {
		globalState.wasError = true;
		globalState.addCurrentWordToEnd();
		showTranslate();
	}
	globalState.inputHandler.showError();
	checkAudio();
}

function showAnswerHandler() {
	checkHiddenFields();
	checkAudio();
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

function addListeners() {
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
	await globalState.initGlobalState();
	addListeners();
	setInput();
}
