import { DEFAULT_SETTINGS, WORD_OBJECT_DEFAULT } from './Constants';
import { API, URL_USER, URL_SETTINGS, URL_NEXT } from '../shared/Constants';
import { USER } from '../utils/CookieConstants';
import CookieMonster from '../utils/CookieMonster';

const biscuit = new CookieMonster();

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
	const lastUpdate = new Date(this.lastUpdateDate);
	const expected = new Date(lastUpdate.setHours(
		lastUpdate.getHours() + DEFAULT_SETTINGS.NEW_DAY_HOURS
	));
	if (now > expected) {
		now.setHours(
			DEFAULT_SETTINGS.HOURS,
			DEFAULT_SETTINGS.MINUTES,
			DEFAULT_SETTINGS.SECONDS,
			DEFAULT_SETTINGS.MILLISECONDS
		);
		this.lastUpdate = now;
		this.newDay();
	}
};

async function save(toSaveObj) {
	const saveJSON = JSON.stringify(toSaveObj);
	const userID = biscuit.getCookie(USER.ID);
	const userToken = biscuit.getCookie(USER.TOKEN);
	const url = `${API}${URL_USER}${URL_NEXT}${userID}${URL_NEXT}${URL_SETTINGS}`;
	const rawResponse = await fetch(url, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${userToken}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: saveJSON,
	});
	const data = await rawResponse.json();
	return data;
}

async function download() {
	const userID = biscuit.getCookie(USER.ID);
	const userToken = biscuit.getCookie(USER.TOKEN);
	const url = `${API}${URL_USER}${URL_NEXT}${userID}${URL_NEXT}${URL_SETTINGS}`;
	let out = {};
	const rawResponse = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${userToken}`,
			Accept: 'application/json',
		},
	});
	if (rawResponse.ok) {
		out = await rawResponse.json();
	}
	return out.optional || out;
}

const saveParametersNow = async function saveParametersNow() {
	const keysToSave = Object.keys(WORD_OBJECT_DEFAULT);
	const toSaveObj = { optional: {} };
	keysToSave.forEach((key) => {
		toSaveObj.optional[key] = this[key];
	});
	try {
		await save(toSaveObj);
	} catch (error) {
		console.log('error save', error);
	}

	console.log('toSaveObj', toSaveObj);
};

const getSettingsNow = async function getSettingsNow() {
	let settings = null;
	try {
		const data = await download();
		settings = data;
		this.updateSettings(settings);
	} catch (error) {
		console.log('error get', error);
	}
	return settings;
};

const update = async function update(settings) {
	const keysToSave = Object.keys(settings);
	keysToSave.forEach((key) => {
		this[key] = settings[key];
	});
	this.saveParameters();
};

export default class Settings {
	static getCopyDefaultObject() {
		const copy = {};
		const keysToSave = Object.keys(WORD_OBJECT_DEFAULT);
		keysToSave.forEach((key) => {
			copy[key] = WORD_OBJECT_DEFAULT[key];
		});
		return copy;
	}

	static async init(isFirstInitialization = false) {
		const returnedSettingsObject = Settings.getCopyDefaultObject();
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
		returnedSettingsObject.getSettings = getSettingsNow;
		returnedSettingsObject.updateSettings = update;

		if (!isFirstInitialization) {
			await returnedSettingsObject.getSettings();
			returnedSettingsObject.checkNewDate();
		}
		await returnedSettingsObject.saveParameters();

		return returnedSettingsObject;
	}

	static async getInstance() {
		Settings.instance = await Settings.init();
		return Settings.instance;
	}
}

Settings.instance = null;
