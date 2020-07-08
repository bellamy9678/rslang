import CookieMonster from '../utils/CookieMonster';
import {DEFAULT_SETTINGS} from './Constants';

const biscuit = new CookieMonster();

export default class SettingsService {
	constructor() {
		this.download = SettingsService.download;
		this.getUserName = SettingsService.getUserName;
		this.save = SettingsService.save;
	}

	static download() {
		const userCookie = biscuit.getCookie(
			sessionStorage.getItem(DEFAULT_SETTINGS.FIELD_USERNAME)
		);
		const userSettings = JSON.parse(userCookie);
		return userSettings;
	}

	static getUserName() {
		return biscuit.getCookie(
			sessionStorage.getItem(DEFAULT_SETTINGS.FIELD_USERNAME)
		);
	}

	static save(toSaveObj) {
		const saveJSON = JSON.stringify(toSaveObj);
		const name = sessionStorage.getItem(DEFAULT_SETTINGS.FIELD_USERNAME);
		const options = {
			'max-age': DEFAULT_SETTINGS.SECONDS_IN_YEAR,
		};
		biscuit.setCookie(name, saveJSON, options);
	}
}
