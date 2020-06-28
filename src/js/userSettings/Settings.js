import DEFAULT_SETTINGS from './Constants';
import SettingsController from './SettingsController';

const controller = new SettingsController();

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

const makeZeroProgress = function makeZeroProgress() {
	this.newWordsShowed = 0;
	this.cardsShowed = 0;
};

const checkNewDateNow = function checkNewDateNow() {
	const now = new Date();
	const user = sessionStorage.getItem(DEFAULT_SETTINGS.FIELD_USERNAME)
		? sessionStorage.getItem(DEFAULT_SETTINGS.FIELD_USERNAME)
		: DEFAULT_SETTINGS.DEFAULT_USERNAME;
	sessionStorage.setItem(DEFAULT_SETTINGS.FIELD_USERNAME, user);
	const lastUpdate = localStorage.getItem(user)
		? new Date(+localStorage.getItem(user))
		: new Date(DEFAULT_SETTINGS.VERY_OLD_DATE);
	const expected = lastUpdate.setHours(lastUpdate.getHours() + 24);

	if (now > expected) {
		const checkDate = new Date();
		checkDate.setHours(4, 0, 0, 0);
		localStorage.setItem(user, checkDate);
		this.newDay();
	}
};

const saveParametersNow = function saveParametersNow() {
	const toSaveObj = {
		progress: this.progress,
		maxNewWords: this.maxNewWords,
		newWordsShowed: this.newWordsShowed,
		maxCards: this.maxCards,
		cardsShowed: this.cardsShowed,
		translate: this.translate,
		meaning: this.meaning,
		example: this.example,
		transcription: this.transcription,
		picture: this.picture,
		deleteButton: this.deleteButton,
		difficultButton: this.difficultButton,
		complexityButtons: this.complexityButtons,
		playWord: this.playWord,
		playMeaning: this.playMeaning,
		playExample: this.playExample,
	};
	controller.save(toSaveObj);
};

export default class Settings {
	constructor() {
		return Settings.getInstance();
	}

	static init() {
		const returnedSettingsObject = {};
		const progressCopy = {};
		const isOldUser = !!controller.getUserName();

		if (isOldUser) {
			const userSettings = controller.download();
			returnedSettingsObject.maxNewWords = userSettings.maxNewWords;
			returnedSettingsObject.newWordsShowed = userSettings.newWordsShowed;
			returnedSettingsObject.maxCards = userSettings.maxCards;
			returnedSettingsObject.cardsShowed = userSettings.cardsShowed;
			returnedSettingsObject.progress = userSettings.progress;
			returnedSettingsObject.translate = userSettings.translate;
			returnedSettingsObject.meaning = userSettings.meaning;
			returnedSettingsObject.example = userSettings.example;
			returnedSettingsObject.transcription = userSettings.transcription;
			returnedSettingsObject.picture = userSettings.picture;
			returnedSettingsObject.deleteButton = userSettings.deleteButton;
			returnedSettingsObject.difficultButton = userSettings.difficultButton;
			returnedSettingsObject.complexityButtons = userSettings.complexityButtons;
			returnedSettingsObject.playWord = userSettings.playWord;
			returnedSettingsObject.playMeaning = userSettings.playMeaning;
			returnedSettingsObject.playExample = userSettings.playExample;
		} else {
			returnedSettingsObject.maxNewWords = DEFAULT_SETTINGS.MAX_NEW_WORDS;
			returnedSettingsObject.newWordsShowed = DEFAULT_SETTINGS.NEW_WORDS_SHOWED;
			returnedSettingsObject.maxCards = DEFAULT_SETTINGS.MAX_CARDS;
			returnedSettingsObject.cardsShowed = DEFAULT_SETTINGS.CARDS_SHOWED;

			progressCopy.group = DEFAULT_SETTINGS.PROGRESS.GROUP;
			progressCopy.page = DEFAULT_SETTINGS.PROGRESS.PAGE;
			returnedSettingsObject.progress = progressCopy;

			returnedSettingsObject.translate = true;
			returnedSettingsObject.meaning = true;
			returnedSettingsObject.example = true;
			returnedSettingsObject.transcription = true;
			returnedSettingsObject.picture = true;
			returnedSettingsObject.deleteButton = true;
			returnedSettingsObject.difficultButton = true;
			returnedSettingsObject.complexityButtons = true;
			returnedSettingsObject.playWord = true;
			returnedSettingsObject.playMeaning = true;
			returnedSettingsObject.playExample = true;
		}

		returnedSettingsObject.cardsToShowAmount = amountCardsToShow;
		returnedSettingsObject.newWordsToShowAmount = amountNewWordsToShow;
		returnedSettingsObject.setMaxNewWords = setupMaxNewWords;
		returnedSettingsObject.setMaxCards = setupMaxCards;
		returnedSettingsObject.incCardsShowed = increaseCardsShowed;
		returnedSettingsObject.incNewWordsShowed = increaseNewWords;
		returnedSettingsObject.setProgress = setProgressGroupPage;
		returnedSettingsObject.incProgress = increaseProgress;
		returnedSettingsObject.newDay = makeZeroProgress;
		returnedSettingsObject.checkNewDate = checkNewDateNow;
		returnedSettingsObject.saveParameters = saveParametersNow;

		returnedSettingsObject.checkNewDate();
		returnedSettingsObject.saveParameters();

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
