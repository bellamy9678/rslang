import {
	ERROR_MESSAGES
} from '../shared/Text';
import TAGS from '../shared/Tags.json';
import DOMElementCreator from '../utils/DOMElementCreator';

export default class InvalidUserData {
	static showInvalidInput(elements) {
		elements.forEach(element => element.classList.add('error__input'));
	}

	static createMessage(text) {
		const newElem = new DOMElementCreator();
		return newElem.create({
			elem: TAGS.SPAN,
			classes: 'error__message',
			child: text,
		});
	}

	static showAuthorisationErrorMessage() {
		const message = this.createMessage(ERROR_MESSAGES.authorizationErrorMessage);
		const authorizationForm = document.querySelector('.authorization__form');
		const previousMessage = document.querySelector('.authorization__form > .error__message');
		if (!previousMessage) {
			authorizationForm.prepend(message);
		}
	}

	static showErrorMessage(messageText) {
		const message = this.createMessage(messageText);
		const previousMessage = document.querySelector('.error__message');
		const newUserPassword = document.getElementById('new-user__password');
		if (!previousMessage) {
			newUserPassword.after(message);
		} else if (previousMessage.innerText !== message) {
			previousMessage.remove();
			newUserPassword.after(message);
		}
	}
}
