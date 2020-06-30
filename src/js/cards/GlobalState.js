import {
	DEFAULT_POSITION,
	CARD_CONTAINER,
	START_LEVEL,
	START_PAGE,
	INPUT_ID,
	EMPTY_STRING,
	FADE_CLASS,
	SETTINGS_OBJECT_DEFAULT,
} from './CardConstants';
import getNewWordsArray from './GetWordsFromAPI';
import Card from './Card';
import SettingsChecker from './SettingsChecker';
import WORDS_EVENTS from '../observer/WordsEvents';

export default class GlobalState {
	constructor() {
		this.currentPosition = DEFAULT_POSITION;
		this.container = CARD_CONTAINER;
		this.wasError = false;
	}

	increasePosition() {
		this.currentPosition += 1;
	}

	removeCard() {
		this.container.removeChild(this.container.lastChild);
	}

	addCard() {
		this.container.append(this.getCurrentCard());
		this.container.querySelector(`#${INPUT_ID}`).value = EMPTY_STRING;
		this.container.querySelector(`#${INPUT_ID}`).focus();
		const translateHandler = new SettingsChecker();
		translateHandler.checkAllSettings(SETTINGS_OBJECT_DEFAULT);
	}

	updateCard() {
		this.removeCard();
		if (this.currentPosition < this.cards.length) {
			this.addCard();
		} else {
			const gameOverEvent = new CustomEvent(
				WORDS_EVENTS.TRAINING_GAME_OVER,
				{}
			);
			CARD_CONTAINER.dispatchEvent(gameOverEvent);
		}
	}

	getCurrentCard() {
		return this.cards[this.currentPosition];
	}

	async initGlobalState() {
		this.words = await getNewWordsArray(START_LEVEL, START_PAGE);
		this.cards = this.words.map((word) => {
			const cardUnit = new Card(word);
			const cardElem = cardUnit.create();
			return cardElem;
		});
		this.addCard();
		this.container.querySelector('.card').classList.remove(FADE_CLASS);
	}

	finishGame() {
		console.log('Все карточки на сегодня!');
		delete this.currentPosition;
		delete this.words;
		delete this.cards;
		delete this.container;
	}

	addCurrentWordToEnd() {
		const clearCard = new Card(this.words[this.currentPosition]);
		const cardElem = clearCard.create();
		this.cards.push(cardElem);
		this.words.push(this.words[this.currentPosition]);
	}
}
