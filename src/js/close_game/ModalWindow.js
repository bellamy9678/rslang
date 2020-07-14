import DOMElementCreator from '../utils/DOMElementCreator';
import * as TAGS from '../shared/Tags.json';

const factory = new DOMElementCreator();

export default class ModalWindow {
	constructor() {
		this.buttons = [];
	}

	static showModal(element) {
		const appContainer = document.querySelector('.app');
		const APP_CONTAINER = appContainer.querySelector('.wrapper');
		APP_CONTAINER.append(this.generateModalWindow(element));
		this.modalWithBackground.classList.remove('none');
		setTimeout(() => {
			this.modalWindow.classList.add('md__show');
		}, 0);
	}

	static generateModalWindow(element) {
		this.modalContent = factory.create({
			elem: TAGS.DIV,
			classes: 'md__content',
		});

		if (element) {
			this.modalContent.append(element);
		}

		this.modalWindow = factory.create({
			elem: TAGS.DIV,
			classes: 'md__modal',
			child: this.modalContent
		});

		this.modalWithBackground = factory.create({
			elem: TAGS.DIV,
			classes: ['wrapper', 'md__overlay', 'none'],
			child: this.modalWindow
		});
		return this.modalWithBackground;
	}

	static closeModalWindow() {
		this.modalWithBackground.remove();
	}
}
