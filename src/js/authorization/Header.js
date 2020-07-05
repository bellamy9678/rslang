import {
	AUTHORIZATION_BUTTONS,
	LINKS,
	AUTHORIZATION_FORM,
} from '../shared/Text';
import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import StartPage from './StartPage';
import NewUser from './NewUser';
import Authorization from './Authorization';
import InvalidUserData from './InvalidUserData';
import showSettingsPage from '../settings/SettingsPage';
import {
	USER
} from '../utils/CookieConstants';
import CookieMonster from '../utils/CookieMonster';

export default class Header {

	static createUnauthorisedUserLinks() {
		const newElem = new DOMElementCreator();
		const teamLink = newElem.create({
			elem: TAGS.LI,
			classes: 'navigation__link',
			id: 'link_team',
			child: LINKS.team,
		});

		const gettingStartedLink = newElem.create({
			elem: TAGS.LI,
			classes: 'navigation__link',
			id: 'link_start',
			child: LINKS.gettingStarted,
		});
		const navigation = document.querySelector('.navigation');
		navigation.prepend(teamLink, gettingStartedLink);
	}

	static createUnauthorisedUserButtons() {
		const newElem = new DOMElementCreator();
		const signInButton = newElem.create({
			elem: TAGS.BUTTON,
			classes: ['button', 'button_bordered', 'button_unauthorized'],
			id: 'sign-in',
			child: AUTHORIZATION_BUTTONS.signIn,
		});

		const signUpButton = newElem.create({
			elem: TAGS.BUTTON,
			classes: ['button', 'button_colored', 'button_unauthorized'],
			id: 'sign-up',
			child: AUTHORIZATION_BUTTONS.signUp,
		});
		const buttons = document.querySelector('.header__buttons');
		buttons.append(signInButton, signUpButton);

		signInButton.addEventListener('click', () => {
			const authorizationForm = document.querySelector('.authorization');
			if (!authorizationForm) {
				this.createForm();
			} else {
				this.hideForm();
			}
		});

		signUpButton.addEventListener('click', () => {
			NewUser.showCreateAccountPage();
			const createUserButton = document.querySelector('.account-creation__button');
			createUserButton.addEventListener('click', (event) => {
				event.preventDefault();
				const userData = NewUser.getNewUserData();
				const newUserName = document.getElementById('new-user__name');
				try {
					NewUser.createUser(userData)
						.then(() => Authorization.authorizeUser({
							email: userData.email,
							password: userData.password
						}), () => InvalidUserData.showInvalidInput([newUserName]))
						.then(() => this.create(), () => null);
				} catch (error) {
					console.error(error.message);
				}
			});
		});
	}

	static createUserNavigation() {
		const newElem = new DOMElementCreator();
		const settingsLink = newElem.create({
			elem: TAGS.LI,
			classes: 'navigation__link',
			id: 'link_settings',
			attr: {
				type: 'userElement'
			},
			child: LINKS.settings,
		});

		settingsLink.addEventListener('click', showSettingsPage);

		const statisticLink = newElem.create({
			elem: TAGS.LI,
			classes: 'navigation__link',
			id: 'link_statistic',
			attr: {
				type: 'userElement'
			},
			child: LINKS.statistic,
		});

		const dictionaryLink = newElem.create({
			elem: TAGS.LI,
			classes: 'navigation__link',
			id: 'link_dictionary',
			attr: {
				type: 'userElement'
			},
			child: LINKS.dictionary,
		});
		const navigation = document.querySelector('.navigation');
		navigation.prepend(settingsLink, statisticLink, dictionaryLink);
	}

	static createUserButtons(username) {
		const newElem = new DOMElementCreator();
		const logOutButton = newElem.create({
			elem: TAGS.BUTTON,
			classes: ['button', 'button_colored-add'],
			id: 'log-out',
			attr: {
				type: 'userElement'
			},
			child: AUTHORIZATION_BUTTONS.logOut,
		});

		const buttons = document.querySelector('.header__buttons');
		logOutButton.addEventListener('click', () => {
			const cookie = new CookieMonster();
			cookie.deleteCookie(USER.NAME, USER.TOKEN);
			this.create();
			StartPage.showStartPage();
		});

		const userName = newElem.create({
			elem: TAGS.SPAN,
			classes: ['user__name'],
		});

		const userIcon = newElem.create({
			elem: TAGS.SPAN,
			classes: ['icon', 'user__icon'],
		});

		const user = newElem.create({
			elem: TAGS.SPAN,
			classes: ['user'],
			attr: {
				type: 'userElement'
			},
			child: [userIcon, userName],
		});

		userName.innerText = `${username}`;
		buttons.append(logOutButton, user);
	}

	static createForm() {
		const newElem = new DOMElementCreator();
		const userNameLabel = newElem.create({
			elem: TAGS.LABEL,
			attr: [{
				for: 'user__name'
			}],
			child: AUTHORIZATION_FORM.userName,
		});

		const userNameInput = newElem.create({
			elem: TAGS.INPUT,
			classes: 'authorization__username',
			id: 'user__name',
			attr: [{
				type: 'text'
			}, {
				required: 'required',
			}],
		});

		const userPasswordLabel = newElem.create({
			elem: TAGS.LABEL,
			attr: [{
				for: 'user__password'
			}],
			child: AUTHORIZATION_FORM.password,
		});

		const userPasswordInput = newElem.create({
			elem: TAGS.INPUT,
			classes: 'authorization__password',
			id: 'user__password',
			attr: [{
				type: 'text'
			}, {
				required: 'required',
			}],
		});

		const authorizeButton = newElem.create({
			elem: TAGS.BUTTON,
			classes: ['button', 'button_colored', 'authorization__button'],
			child: AUTHORIZATION_FORM.button,
		});

		authorizeButton.addEventListener('click', (event) => {
			event.preventDefault();
			const userName = document.getElementById('user__name');
			const userPassword = document.getElementById('user__password');
			const userData = new Authorization(userName.value, userPassword.value);
			Authorization.authorizeUser(userData)
				.then(() => this.hideForm(), () => {
					InvalidUserData.showInvalidInput([userName, userPassword]);
					InvalidUserData.showAuthorisationErrorMessage();
				})
				.then(() => this.create());
		});

		const authorizeForm = newElem.create({
			elem: TAGS.FORM,
			classes: 'authorization__form',
			child: [userNameLabel, userNameInput, userPasswordLabel, userPasswordInput, authorizeButton]
		});

		const wrapper = newElem.create({
			elem: TAGS.DIV,
			classes: ['wrapper', 'authorization__wrapper'],
			child: authorizeForm,
		});

		const modalWindow = newElem.create({
			elem: TAGS.DIV,
			classes: ['authorization'],
			child: wrapper,
		});

		const overlay = newElem.create({
			elem: TAGS.DIV,
			classes: ['overlay'],
		});

		const app = document.querySelector('.app');
		const header = document.querySelector('.header');
		header.after(modalWindow);
		app.append(overlay);
	}

	static hideForm() {
		const authorizeForm = document.querySelector('.authorization');
		const overlay = document.querySelector('.overlay');
		authorizeForm.remove();
		overlay.remove();
	}

	static create() {
		try {
			const cookie = new CookieMonster();
			const userName = cookie.getCookie(USER.NAME);
			const buttons = document.querySelector('.header__buttons');
			buttons.querySelectorAll('*').forEach(button => button.remove());
			document.querySelectorAll('.navigation__link').forEach(link => link.remove());
			if (!userName) {
				throw new Error('User is not authorized');
			}
			this.createUserNavigation();
			this.createUserButtons(userName);
		} catch (error) {
			this.createUnauthorisedUserButtons();
		} finally {
			this.createUnauthorisedUserLinks();
		}
	}
}
