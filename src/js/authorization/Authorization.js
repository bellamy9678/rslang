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
	constructor() {
		this.email = `${Authorization.getUserData().name}${EMAIL_PART}`;
		this.password = Authorization.getUserData().password;
	}

	static getUserData() {
		const userName = document.getElementById('user__name');
		const userPassword = document.getElementById('user__password');
		return {
			name: userName.value,
			password: userPassword.value,
		};
	}

	static async authorizeUser() {
		try {
			const rawResponse = await fetch(`${API}${URL_PARAM_SIGN_IN}`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(new Authorization),
			});
			const content = await rawResponse.json();
			console.log(content);
			const userData = new Authorization();
			const userName = userData.email.replace(`${EMAIL_PART}`, '');
			console.log('Authorization -> userName', userName);
			Cookie.setUserCookie(USER_COOKIE_NAME.TOKEN, content.token);
			Cookie.setUserCookie(USER_COOKIE_NAME.NAME, userName);
			WelcomePage.showWelcomePage(userName);
		} catch (error) {
			console.error('This user is not found');
		}
	}
}
