import DEFAULT_SETTINGS from './Constants';

const amountCardsToShow = function amountCardsToShow() {
	return this.maxCards - this.cardsShowed;
};

const amountNewWordsToShow = function amountNewWordsToShow() {
	return this.maxNewWords - this.newWordsShowed;
};

const setupMaxNewWords = function setupMaxNewWords(number) {
	if (+number >= DEFAULT_SETTINGS.MIN_AMOUNT) {
		this.maxNewWords = +number;
	}
};

const setupMaxCards = function setupMaxCards(number) {
	if (+number >= DEFAULT_SETTINGS.MIN_AMOUNT) {
		this.maxCards = +number;
	}
};

const increaseNewWords = function increaseNewWords() {
	this.newWordsShowed += 1;
};

const increaseCardsShowed = function increaseCardsShowed() {
	this.cardsShowed += 1;
};

const setProgressGroupPage = function setProgressGroupPage(group, page) {
	if (
		+group >= DEFAULT_SETTINGS.GROUPS_START &&
		+group <= DEFAULT_SETTINGS.GROUPS_END &&
		+page >= DEFAULT_SETTINGS.PAGES_START &&
		+page <= DEFAULT_SETTINGS.PAGES_END
	) {
		this.progress.group = +group;
		this.progress.page = +page;
	}
};

const increaseProgress = function increaseProgress() {
	if (this.progress.page < DEFAULT_SETTINGS.PAGES_END) {
		this.progress.page += 1;
	} else if (this.progress.group < DEFAULT_SETTINGS.GROUPS_END) {
		this.progress.page = DEFAULT_SETTINGS.PAGES_START;
		this.progress.group += 1;
	}
};

export default class Settings {
	constructor() {
		return Settings.getInstance();
	}

	static init() {
		const progressCopy = {};
		progressCopy.group = DEFAULT_SETTINGS.PROGRESS.GROUP;
		progressCopy.page = DEFAULT_SETTINGS.PROGRESS.PAGE;

		const returnedSettingsObject = {
			maxNewWords: DEFAULT_SETTINGS.MAX_NEW_WORDS,
			newWordsShowed: DEFAULT_SETTINGS.NEW_WORDS_SHOWED,
			maxCards: DEFAULT_SETTINGS.MAX_CARDS,
			cardsShowed: DEFAULT_SETTINGS.CARDS_SHOWED,
			progress: progressCopy,

			cardsToShowAmount: amountCardsToShow,
			newWordsToShowAmount: amountNewWordsToShow,
			setMaxNewWords: setupMaxNewWords,
			setMaxCards: setupMaxCards,
			incCardsShowed: increaseCardsShowed,
			incNewWordsShowed: increaseNewWords,
			setProgress: setProgressGroupPage,
			incProgress: increaseProgress,
		};

		Object.freeze(returnedSettingsObject);

		return returnedSettingsObject;
	}

	static getInstance() {
		if (Settings.instance === null) {
			Settings.instance = Settings.init();
		}
		return Settings.instance;
	}
}

Settings.instance = null;
