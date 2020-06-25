import {
	AUTHORIZATION_BUTTONS,
	LINKS
} from '../shared/Text';
import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import {
	addSignInForm
} from './Authorization';
import showCreateAccountPage from './CreateUser';

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

export function createUnauthorisedUserLinks() {
	const navigation = document.querySelector('.navigation');
	navigation.prepend(teamLink, gettingStartedLink);
}

export function createUnauthorisedUserButtons() {
	const buttons = document.querySelector('.header__buttons');
	buttons.append(signInButton, signUpButton);
	addSignInForm();
	signUpButton.addEventListener('click', showCreateAccountPage);
}
