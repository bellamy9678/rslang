import {
	EMAIL_PART,
	USERNAME_REG_EXP,
	PASSWORD_REG_EXP
} from './Constants';
import {
	API,
	URL_USER
} from '../shared/Constants';
import TAGS from '../shared/Tags.json';
import DOMElementCreator from '../utils/DOMElementCreator';
import {
	TEXT,
	AUTHORIZATION_FORM,
	AUTHORIZATION_BUTTONS,
	ERROR_MESSAGES
} from '../shared/Text';
import InvalidUserData from './InvalidUserData';

export default class NewUser {

	static getNewUserData() {
		const emailInput = document.getElementById('new-user__name');
		const passwordInput = document.getElementById('new-user__password');
		return {
			name: emailInput.value,
			email: `${emailInput.value}${EMAIL_PART}`,
			password: passwordInput.value,
		};
	}

	static checkUsername(username) {
		return USERNAME_REG_EXP.test(username);
	}

	static checkPassword(password) {
		return PASSWORD_REG_EXP.test(password);
	}

	static showInvalidUserData(input, message) {
		InvalidUserData.showInvalidInput([input]);
		throw new Error(message);
	}

	static async makeRequest(userData, [...inputs], message) {
		try {
			const userInfo = {
				email: userData.email,
				password: userData.password
			};
			await fetch(`${API}${URL_USER}`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userInfo),
			});
		} catch (error) {
			InvalidUserData.showErrorMessage(message);
			InvalidUserData.showInvalidInput([...inputs]);
			throw new Error(message);
		}
	}

	static async createUser(userData) {
		const newUserName = document.getElementById('new-user__name');
		const newUserPassword = document.getElementById('new-user__password');
		try {
			if (this.checkUsername(userData.name)) {
				this.showInvalidUserData(newUserName, ERROR_MESSAGES.invalidUsername);
			} else if (!this.checkPassword(userData.password)) {
				this.showInvalidUserData(newUserPassword, ERROR_MESSAGES.invalidPassword);
			} else {
				await this.makeRequest(userData, [newUserName, newUserPassword], ERROR_MESSAGES.existingUser);
			}
		} catch (error) {
			InvalidUserData.showErrorMessage(error.message);
			throw new Error(error.message);
		}
	}

	static showCreateAccountPage() {
		const app = document.querySelector('.app');
		const newElem = new DOMElementCreator();

		const title = newElem.create({
			elem: TAGS.H2,
			classes: 'account-creation__title',
			child: TEXT.createUserPage.title,
		});

		const signInLink = newElem.create({
			elem: TAGS.SPAN,
			classes: 'account-creation__link',
			child: AUTHORIZATION_BUTTONS.signIn,
		});

		const text = newElem.create({
			elem: TAGS.P,
			classes: 'account-creation__text',
			child: [TEXT.createUserPage.text, signInLink]
		});

		const userNameLabel = newElem.create({
			elem: TAGS.LABEL,
			attr: [{
				for: 'new-user__name',
			}, ],
			child: AUTHORIZATION_FORM.userName,
		});

		const userNameInput = newElem.create({
			elem: TAGS.INPUT,
			classes: 'account-creation__username',
			id: 'new-user__name',
			attr: [{
				type: 'text',
			},
			{
				required: 'required',
			},
			],
		});

		const userPasswordLabel = newElem.create({
			elem: TAGS.LABEL,
			attr: [{
				for: 'new-user__password',
			}, ],
			child: AUTHORIZATION_FORM.password,
		});

		const userPasswordInput = newElem.create({
			elem: TAGS.INPUT,
			classes: 'account-creation__password',
			id: 'new-user__password',
			attr: [{
				type: 'password',
			},
			{
				required: 'required',
			},
			],
		});

		const createUserButton = newElem.create({
			elem: TAGS.BUTTON,
			classes: ['button', 'button_colored', 'account-creation__button'],
			child: AUTHORIZATION_BUTTONS.signUp,
		});

		const form = newElem.create({
			elem: TAGS.FORM,
			classes: 'account-creation__form',
			child: [
				title,
				text,
				userNameLabel,
				userNameInput,
				userPasswordLabel,
				userPasswordInput,
				createUserButton,
			],
		});

		const background = newElem.create({
			elem: TAGS.DIV,
			classes: 'account-creation__background',
			child: [form],
		});

		const page = newElem.create({
			elem: TAGS.DIV,
			classes: 'account-creation',
			child: [background],
		});

		app.firstChild.remove();
		app.append(page);
	}
}
