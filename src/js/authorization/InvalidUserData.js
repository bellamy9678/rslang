import {
	ERROR_MESSAGES
} from '../shared/Text';

import TAGS from '../shared/Tags.json';
import DOMElementCreator from '../utils/DOMElementCreator';

export default class InvalidUserData {
	static showInvalidInput() {
		const userName = document.getElementById('user__name');
		const userPassword = document.getElementById('user__password');
		const newUserName = document.getElementById('new-user__name');
		const newUserPassword = document.getElementById('new-user__password');
		const name = userName || newUserName;
		name.classList.add('error__input');
		const password = userPassword || newUserPassword;
		password.classList.add('error__input');
	}

	static showErrorMessage() {
		const newElem = new DOMElementCreator();
		const message = newElem.create({
			elem: TAGS.SPAN,
			classes: 'error__message',
			child: ERROR_MESSAGES.authorizationErrorMessage,
		});

		const authorizationForm = document.querySelector('.authorization__form');
		if (!document.querySelector('.error__message')) {
			authorizationForm.prepend(message);
		}
	}
}
