import ModalWindow from './ModalWindow';
import DOMElementCreator from '../utils/DOMElementCreator';
import * as TAGS from '../shared/Tags.json';
import * as CONST from './constants';

const factory = new DOMElementCreator();

export default class CloseGame {
	constructor() {
		this.modalShowed = false;
	}

	generateContent() {
		this.exitBtn = factory.create({
			elem: TAGS.BUTTON,
			classes: ['button', 'md__exit_btn'],
			child: CONST.EXIT_BTN_TEXT
		});
		this.stayBtn = factory.create({
			elem: TAGS.BUTTON,
			classes: ['button', 'md__stayt_btn'],
			child: CONST.STAY_BTN_TEXT
		});

		const buttonsContainer = factory.create({
			elem: TAGS.DIV,
			classes: 'md__buttons',
			child: [this.stayBtn, this.exitBtn]
		});

		const text = factory.create({
			elem: TAGS.P,
			classes: 'md__text',
			child: CONST.MODAL_WIN_TEXT
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

		this.stayBtnHand = this.stayBtnHandler.bind(this);
		this.stayBtn.addEventListener('click', this.stayBtnHand);
	}

	removeEventListeners() {
		this.exitBtn.removeEventListener('click', this.exitBtnHand);
		this.stayBtn.removeEventListener('click', this.stayBtnHand);
	}

	exitBtnHandler() {
		this.exitModalWindow();
		this.removeEventListenerFromDocument();
		if (this.removeEventListenerFunc) {
			this.removeEventListenerFunc();
		}
		this.eventTarget.click();
	}

	stayBtnHandler() {
		this.exitModalWindow();
	}

	exitModalWindow() {
		this.removeEventListeners();
		ModalWindow.closeModalWindow();
		this.modalShowed = false;
	}

	showCloseGame() {
		const innerWinContent = this.generateContent();
		this.addEventListeners();
		ModalWindow.showModal(innerWinContent);
		this.modalShowed = true;
	}

	removeEventListenerFromDocument() {
		document.removeEventListener('mousedown', this.documentClickHand);
	}

	documentClickHandler(event) {
		if (
			!event.target.closest(CONST.APP_CONTAINER_SELECTOR)
			&& !event.target.closest('.md__overlay')
			&& !event.target.classList.contains('header')
			&& !event.target.classList.contains('navigation')
			&& !event.target.classList.contains('header__wrapper')
			&& !this.modalShowed
		) {
			this.eventTarget = event.target;
			this.showCloseGame();
		}
	}


	addEventListenerToDocument(removeEventListenerFunc) {
		this.removeEventListenerFunc = removeEventListenerFunc;
		this.documentClickHand = this.documentClickHandler.bind(this);
		document.addEventListener('mousedown', this.documentClickHand);
	}





}
