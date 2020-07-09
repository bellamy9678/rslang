import {
	EMAIL_PART,
} from './Constants';
import {
	API,
	URL_SIGN_IN
} from '../shared/Constants';
import {
	USER,
} from '../utils/CookieConstants';
import showMainPage from '../mainPage/MainPage';
import CookieMonster from '../utils/CookieMonster';

export default class Authorization {
	constructor(name, password) {
		this.email = `${name}${EMAIL_PART}`;
		this.password = password;
	}

	static async authorizeUser(userData) {
		console.log('Authorization -> authorizeUser -> userData', userData);
		const rawResponse = await fetch(`${API}${URL_SIGN_IN}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		try {
			const content = await rawResponse.json();
			console.log(content);
			const userName = userData.email.replace(`${EMAIL_PART}`, '');
			const cookie = new CookieMonster();
			cookie.setCookie(USER.NAME, userName);
			cookie.setCookie(USER.ID, content.userId);
			cookie.setCookie(USER.TOKEN, content.token);
			showMainPage(userName);
		} catch (error) {
			console.log(rawResponse.status);
			console.error(error);
			throw new Error(error.message);
		}
	}
}
