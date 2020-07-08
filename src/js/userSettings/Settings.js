import { DEFAULT_SETTINGS, WORD_OBJECT_DEFAULT } from './Constants';
import SettingsService from './SettingsService';

const service = new SettingsService();

const amountCardsToShow = function amountCardsToShow() {
	return this.maxCards - this.cardsShowed;
};

const amountNewWordsToShow = function amountNewWordsToShow() {
	return this.maxNewWords - this.newWordsShowed;
};

const setupMaxNewWords = function setupMaxNewWords(number) {
	if (+number >= DEFAULT_SETTINGS.MIN_PROGRESS) {
		this.maxNewWords = +number;
	}
};

const setupMaxCards = function setupMaxCards(number) {
	if (+number >= DEFAULT_SETTINGS.MIN_PROGRESS) {
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
	this.newWordsShowed = DEFAULT_SETTINGS.MIN_PROGRESS;
	this.cardsShowed = DEFAULT_SETTINGS.MIN_PROGRESS;
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
	const expected = lastUpdate.setHours(
		lastUpdate.getHours() + DEFAULT_SETTINGS.NEXT_LEARNING_HOURS
	);

	if (now > expected) {
		const checkDate = new Date();
		checkDate.setHours(
			DEFAULT_SETTINGS.HOURS,
			DEFAULT_SETTINGS.MINUTES,
			DEFAULT_SETTINGS.SECONDS,
			DEFAULT_SETTINGS.MILLISECONDS
		);
		localStorage.setItem(user, checkDate);
		this.newDay();
	}
};

const saveParametersNow = function saveParametersNow() {
	const keysToSave = Object.keys(WORD_OBJECT_DEFAULT);
	const toSaveObj = {};
	keysToSave.forEach((key) => {
		toSaveObj[key] = this[key];
	});
	service.save(toSaveObj);
};

export default class Settings {
	constructor() {
		return Settings.getInstance();
	}

	static getCopyDefaultObject() {
		const copy = {};
		const keysToSave = Object.keys(WORD_OBJECT_DEFAULT);
		keysToSave.forEach((key) => {
			copy[key] = WORD_OBJECT_DEFAULT[key];
		});
		return copy;
	}

	static init() {
		const returnedSettingsObject = Settings.getCopyDefaultObject();
		const isOldUser = !!service.getUserName();

		Settings.getCopyDefaultObject(returnedSettingsObject);

		if (isOldUser) {
			const userSettings = service.download();
			const keysToSave = Object.keys(returnedSettingsObject);
			keysToSave.forEach((key) => {
				returnedSettingsObject[key] = userSettings[key];
			});
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
