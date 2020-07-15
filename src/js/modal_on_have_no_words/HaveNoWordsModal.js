import ModalWindow from '../close_game/ModalWindow';
import DOMElementCreator from '../utils/DOMElementCreator';
import * as TAGS from '../shared/Tags.json';

const factory = new DOMElementCreator();

export default class HaveNoWordsModal {

	generateContent() {
		this.exitBtn = factory.create({
			elem: TAGS.BUTTON,
			classes: ['button', 'md__exit_btn'],
			child: 'Close'
		});

		const buttonsContainer = factory.create({
			elem: TAGS.DIV,
			classes: 'md__buttons',
			child: [this.exitBtn]
		});

		const text = factory.create({
			elem: TAGS.P,
			classes: 'md__text',
			child: 'Congratulations. You have learned all the available words. Add new words in training mode.'
		});

		const contentWrapper = factory.create({
			elem: TAGS.DIV,
			child: [text, buttonsContainer]
		});

		return contentWrapper;
	}

	addEventListeners() {
		this.exitBtnHand = this.exitBtnHandler.bind(this);
		this.exitBtn.addEventListener('click', this.exitBtnHand);

	}

	removeEventListeners() {
		this.exitBtn.removeEventListener('click', this.exitBtnHand);
	}

	exitBtnHandler() {
		this.exitModalWindow();
	}


	exitModalWindow() {
		this.removeEventListeners();
		ModalWindow.closeModalWindow();
	}

	showModal() {
		const innerWinContent = this.generateContent();
		this.addEventListeners();
		ModalWindow.showModal(innerWinContent);
	}


}



