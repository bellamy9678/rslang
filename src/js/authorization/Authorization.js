import {
	EMAIL_PART,
	USER_COOKIE_NAME
} from './Constants';
import {
	API,
	URL_PARAM_SIGN_IN
} from '../shared/Constants';
import showWelcomePage from './WelcomePage';
import {
	setUserCookie
} from './Cookie';

const signInButton = document.getElementById('sign-in');
const autorizeForm = document.querySelector('.authorization');
let userName;
let userPassword;
let authorizeButton;

function Authorization() {
	this.email = `${userName.value}${EMAIL_PART}`;
	this.password = userPassword.value;
}

export default async function authorizeUser(obj) {
	let user = obj;
	if (user === undefined) {
		user = new Authorization();
	}
	const rawResponse = await fetch(`${API}${URL_PARAM_SIGN_IN}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	});

	const content = await rawResponse.json();
	console.log(content);
	setUserCookie(USER_COOKIE_NAME.TOKEN, content.token);
	autorizeForm.classList.add('none');
	const name = user.email.replace(`${EMAIL_PART}`, '');
	showWelcomePage(name);
}

signInButton.addEventListener('click', () => {
	autorizeForm.classList.toggle('none');
	userName = document.querySelector('.authorization__username');
	userPassword = document.querySelector('.authorization__password');
	authorizeButton = document.querySelector('.authorization__button');
	authorizeButton.addEventListener('click', (event) => {
		event.preventDefault();
		authorizeUser();
	});
});
