import {
	USER_COOKIE_NAME,
	NOT_FOUND_VALUE
} from './Constants';

export default class Cookie {
	constructor(cookie) {
		this.name = cookie.find(item => item.indexOf(`${USER_COOKIE_NAME.NAME}`) !== NOT_FOUND_VALUE).replace(`${USER_COOKIE_NAME.NAME}=`, '');
		// this.id = cookie.find(item => item.indexOf(`${USER_COOKIE_NAME.ID}`) !== NOT_FOUND_VALUE).replace(`${USER_COOKIE_NAME.ID}=`, '');
		this.token = cookie.find(item => item.indexOf(`${USER_COOKIE_NAME.TOKEN}`) !== NOT_FOUND_VALUE).replace(`${USER_COOKIE_NAME.TOKEN}=`, '');
	}

	checkUserToken() {
		if (this.token !== ' ') {
			return this.name;
		}
		return false;
	}

	static setUserCookie(name, value) {
		document.cookie = `${name}=${value}`;
	}

	static deleteUserCookie(name) {
		document.cookie = `${name}=; expires=-1`;
	}

}
