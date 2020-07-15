import {
	DEFAULT_POSITION,
	CARD_CONTAINER,
	INPUT_ID,
	EMPTY_STRING,
	FADE_CLASS,
	SETTINGS_OBJECT_DEFAULT,
	PROGRESS_SEPARATOR,
	ARRAY_LENGTH_COEFFICIENT,
	INPUT_WIDTH_UNIT,
	DOM_POSITION_CORRECTION,
} from './CardConstants';
import Card from './Card';
import SettingsChecker from './SettingsChecker';
import WORDS_EVENTS from '../observer/WordsEvents';
import Settings from '../settings/Settings';
import TAGS from '../shared/Tags.json';
import DOMElementCreator from '../utils/DOMElementCreator';
import Service from '../words_service/Service';

const fab = new DOMElementCreator();

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
		this.cardsElements[this.currentPosition - DOM_POSITION_CORRECTION].removeListeners();
		this.cardsContainer.removeChild(this.cardsContainer.lastChild);
	}

	addCard() {
		this.cardsContainer.append(this.getCurrentCard());
		this.cardsContainer.querySelector(`#${INPUT_ID}`).value = EMPTY_STRING;
		this.cardsContainer.querySelector(`#${INPUT_ID}`).focus();
		const translateHandler = new SettingsChecker();
		translateHandler.init();
		translateHandler.checkAllSettings(SETTINGS_OBJECT_DEFAULT);
		this.calcProgress();
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
		this.addContainer();
		this.cardsElements = [];
		this.cardsContainer = CARD_CONTAINER.querySelector('.wrapper');
		this.words = await Service.getRandomWords();
		if (this.words.length === 0) {
			this.finishGame();
			return;
		}

		this.cards = this.words.map((word) => {
			const cardUnit = new Card(word);
			this.cardsElements.push(cardUnit);
			const cardElem = cardUnit.create();
			return cardElem;
		});
		this.addProgress();
		this.addCard();
		this.cardsContainer.querySelector('.card').classList.remove(FADE_CLASS);
	}

	finishGame() {
		this.container.removeChild(this.cardsContainer);
	}

	async addCurrentWordToEnd() {
		let settings = new Settings();
		settings = await Settings.getInstance();

		if (settings.cardsToShowAmount() > this.words.length) {
			const clearCard = new Card(this.words[this.currentPosition]);
			const cardElem = clearCard.create();
			this.cards.push(cardElem);
			this.words.push(this.words[this.currentPosition]);
			this.cardsElements.push(clearCard);
		}
	}

	addContainer() {
		const wrapper = fab.create({
			elem: TAGS.DIV,
			classes: 'wrapper',
		});

		const app = document.querySelector('.app');
		app.firstChild.remove();
		this.container.append(wrapper);
	}

	addProgress() {
		const total = fab.create({
			elem: TAGS.DIV,
			classes: 'progress__total',
			child: this.words.length,
		});
		const current = fab.create({
			elem: TAGS.DIV,
			classes: 'progress__current',
			child: this.currentPosition,
		});
		const separator = fab.create({
			elem: TAGS.DIV,
			classes: 'progress__separator',
			child: PROGRESS_SEPARATOR,
		});
		const progressContainer = fab.create({
			elem: TAGS.DIV,
			classes: 'progress',
			child: [current, separator, total],
		});
		this.progressContainer = progressContainer;
		this.cardsContainer.append(progressContainer);
	}

	calcProgress() {
		const separator = this.progressContainer.querySelector(
			'.progress__separator'
		);
		const current = this.progressContainer.querySelector('.progress__current');
		const total = this.progressContainer.querySelector('.progress__total');

		total.innerText = this.cards.length;
		current.innerText = this.currentPosition + ARRAY_LENGTH_COEFFICIENT;

		const parametersWidth = total.offsetWidth + separator.offsetWidth;
		const sumWidth = current.offsetWidth + parametersWidth;
		const allWidth = this.progressContainer.offsetWidth;

		const neededWidth =
			(allWidth - sumWidth) /
				(+total.innerText - +current.innerText + ARRAY_LENGTH_COEFFICIENT) +
			current.offsetWidth;

		current.style.width = neededWidth + INPUT_WIDTH_UNIT;
	}
}
