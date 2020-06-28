import {
	AUTHORIZATION_BUTTONS,
	LINKS,
	AUTHORIZATION_FORM,
} from '../shared/Text';
import {
	USER_COOKIE_NAME
} from './Constants';
import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import Cookie from './Cookie';
import StartPage from './StartPage';
import CreateUser from './CreateUser';
import Authorization from './Authorization';
import InvalidUserData from './InvalidUserData';

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
			CreateUser.showCreateAccountPage();
			const createUserButton = document.querySelector('.account-creation__button');
			createUserButton.addEventListener('click', (event) => {
				event.preventDefault();
				const userData = CreateUser.getNewUserData();
				CreateUser.createUser(userData).then(() => Authorization.authorizeUser(userData)).then(() => this.create());
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

		const statisticLink = newElem.create({
			elem: TAGS.LI,
			classes: 'navigation__link',
			id: 'link_statistic',
			attr: {
				type: 'userElement'
			},
			child: LINKS.statistic,
		});

		const gamesLink = newElem.create({
			elem: TAGS.LI,
			classes: 'navigation__link',
			id: 'link_games',
			attr: {
				type: 'userElement'
			},
			child: LINKS.games,
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
		navigation.prepend(settingsLink, statisticLink, gamesLink, dictionaryLink);
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
			Cookie.deleteUserCookie(USER_COOKIE_NAME.NAME);
			Cookie.deleteUserCookie(USER_COOKIE_NAME.TOKEN);
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
			const userName = document.getElementById('user__name').value;
			const userPassword = document.getElementById('user__password').value;
			const userData = new Authorization(userName, userPassword);
			Authorization.authorizeUser(userData)
				.then(() => this.hideForm(), () => {
					InvalidUserData.showInvalidInput();
					InvalidUserData.showErrorMessage();
				})
				.then(() => this.create(), null);
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
		const cookieArr = document.cookie.split(';');
		const cookie = new Cookie(cookieArr);
		const userName = cookie.checkUserToken();
		const buttons = document.querySelector('.header__buttons');
		buttons.querySelectorAll('*').forEach(button => button.remove());
		document.querySelectorAll('.navigation__link').forEach(link => link.remove());
		if (userName) {
			this.createUserNavigation();
			this.createUserButtons(userName);
		} else {
			this.createUnauthorisedUserButtons();
		}
		this.createUnauthorisedUserLinks();
	}
}
