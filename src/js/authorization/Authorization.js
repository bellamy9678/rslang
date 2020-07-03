import {
	EMAIL_PART,
	USER_COOKIE_NAME
} from './Constants';
import {
	API,
	URL_PARAM_SIGN_IN
} from '../shared/Constants';
import WelcomePage from './WelcomePage';
import Cookie from './Cookie';

export default class Authorization {
	constructor(name, password) {
		this.email = `${name}${EMAIL_PART}`;
		this.password = password;
	}

	static async authorizeUser(userData) {
		console.log('Authorization -> authorizeUser -> userData', userData);
		const rawResponse = await fetch(`${API}${URL_PARAM_SIGN_IN}`, {
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
			Cookie.setUserCookie(USER_COOKIE_NAME.TOKEN, content.token);
			Cookie.setUserCookie(USER_COOKIE_NAME.NAME, userName);
			WelcomePage.showWelcomePage(userName);
		} catch (error) {
			console.log(rawResponse.status);
			throw new Error(error.message);
		}
	}
}
