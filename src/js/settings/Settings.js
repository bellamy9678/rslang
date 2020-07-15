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

const increaseNewWords = async function increaseNewWords() {
	this.newWordsShowed += 1;
	await this.saveParameters();
};

const increaseCardsShowed = async function increaseCardsShowed() {
	this.cardsShowed += 1;
	await this.saveParameters();
};

const increaseProgress = async function increaseProgress() {
	if (this.progress.page < DEFAULT_SETTINGS.PAGES_END) {
		this.progress.page += 1;
	} else if (this.progress.group < DEFAULT_SETTINGS.GROUPS_END) {
		this.progress.page = DEFAULT_SETTINGS.PAGES_START;
		this.progress.group += 1;
	}
	await this.saveParameters();
};

const makeZeroProgress = async function makeZeroProgress() {
	this.newWordsShowed = DEFAULT_SETTINGS.MIN_PROGRESS;
	this.cardsShowed = DEFAULT_SETTINGS.MIN_PROGRESS;
	await this.saveParameters();
};

const checkNewDateNow = async function checkNewDateNow() {
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
		await this.saveParameters();
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
	console.log('saveParametersNow', toSaveObj);
	try {
		await save(toSaveObj);
	} catch (error) {
		console.log('error save', error);
	}
};

const getSettingsNow = async function getSettingsNow() {
	let settings = null;
	try {
		const data = await download();
		settings = data;
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
	await this.saveParameters();
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
		returnedSettingsObject.incCardsShowed = increaseCardsShowed;
		returnedSettingsObject.incNewWordsShowed = increaseNewWords;
		returnedSettingsObject.incProgress = increaseProgress;
		returnedSettingsObject.newDay = makeZeroProgress;
		returnedSettingsObject.checkNewDate = checkNewDateNow;
		returnedSettingsObject.saveParameters = saveParametersNow;
		returnedSettingsObject.getSettings = getSettingsNow;
		returnedSettingsObject.updateSettings = update;

		if (!isFirstInitialization) {
			await returnedSettingsObject.getSettings();
			await returnedSettingsObject.checkNewDate();
		}

		// Settings.instance = returnedSettingsObject;
		// return Settings.instance;
		return returnedSettingsObject;
	}

	// static async getInstance(isFirstInitialization) {
	// 	if (isFirstInitialization) {
	// 		await Settings.init(isFirstInitialization);
	// 		await Settings.instance.saveParameters();
	// 		return Settings.instance;
	// 	}
	// 	await Settings.init();
	// 	return Settings.instance;
	// }

	static async firstInit() {
		const isFirstInitialization = true;
		Settings.instance = await Settings.init(isFirstInitialization);
		await Settings.instance.saveParameters();
	}

	static async getInstance(isSignIn = false) {
		if (isSignIn) {
			Settings.instance = await Settings.init();
		}
		return Settings.instance;
	}
}

Settings.instance = null;
