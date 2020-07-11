import DOMElementCreator from '../utils/DOMElementCreator';
import * as TAGS from '../shared/Tags.json';
import * as CONST from './constants';
import LevelAndRoundSelect from './LevelSelect';

const factory = new DOMElementCreator();

export default class StartScreen {
	constructor() {
		this.gameName = '';
		this.gameDescription = '';
		this.repeatWordsState = false;
		this.gameData = {
			repeatWords: false
		};
	}

	showStartScreen(settingsObj) {
		this.gameName = settingsObj.name;
		this.gameDescription = settingsObj.descr;
		this.callback = settingsObj.callback;

		this.generateDOMElements();
		this.addEventListeners();

	}

	getData() {
		if (this.gameData.repeatWords === false) {
			if (!this.gameData.level) {
				this.gameData.level = 1;
			}
			if (!this.gameData.round) {
				this.gameData.round = 1;
			}
		}
		return this.gameData;
	}

	addEventListeners() {
		this.switchLeft = document.getElementById('left_btn');
		this.switchRight = document.getElementById('right_btn');
		this.activeSwitch = document.getElementById('active_indicator');
		this.startBtn = document.getElementById('start_game');
		this.levelSelect = document.getElementById('level_select');
		this.roundSelect = document.getElementById('round_select');
		this.levelAndRoundSelect = document.getElementById('levelAndPageSelect');

		this.switchLeftHandler = this.switchBtnLeftHandler.bind(this);
		this.switchLeft.addEventListener('click', this.switchLeftHandler);

		this.switchRightHandler = this.switchBtnRightHandler.bind(this);
		this.switchRight.addEventListener('click', this.switchRightHandler);

		this.startBtnHand = this.startBtnHandler.bind(this);
		this.startBtn.addEventListener('click', this.startBtnHand);

		this.levelSelectHand = this.levelSelectHandler.bind(this);
		this.levelSelect.addEventListener('change', this.levelSelectHand);

		this.roundSelectHand = this.roundSelectHandler.bind(this);
		this.roundSelect.addEventListener('change', this.roundSelectHand);

	}

	removeEventListeners() {
		this.switchLeft.removeEventListener('click', this.switchLeftHandler);
		this.switchRight.removeEventListener('click', this.switchRightHandler);
		this.startBtn.removeEventListener('click', this.startBtnHand);
		this.levelSelect.removeEventListener('change', this.levelSelectHand);
		this.roundSelect.removeEventListener('change', this.roundSelectHand);

	}

	switchBtnLeftHandler() {
		this.gameData.repeatWords = false;
		this.gameData.level = 1;
		this.gameData.round = 1;
		this.levelAndRoundSelect.classList.remove('start_screen__level-and-page--hidden');
		this.switchRight.classList.remove('active_case');
		this.switchLeft.classList.add('active_case');
		this.activeSwitch.style.left = '0%';
	}

	switchBtnRightHandler() {
		this.gameData.repeatWords = true;
		delete this.gameData.level;
		delete this.gameData.round;

		this.levelAndRoundSelect.classList.add('start_screen__level-and-page--hidden');
		this.switchRight.classList.add('active_case');
		this.switchLeft.classList.remove('active_case');
		this.activeSwitch.style.left = '50%';
	}

	startBtnHandler() {
		const app = document.querySelector('.app');
		if (app.firstChild) {
			app.firstChild.remove();
		}
		this.removeEventListeners();
		this.callback();

	}

	levelSelectHandler(event) {
		this.gameData.level = +event.target.value;
	}

	roundSelectHandler(event) {
		this.gameData.round = +event.target.value;
	}

	generateDOMElements() {
		const gameName = factory.create({
			elem: TAGS.H1,
			classes: 'start_screen__name',
			child: this.gameName
		});
		const gameDescription = factory.create({
			elem: TAGS.DIV,
			classes: 'start_screen__description',
			child: this.gameDescription
		});
		const switchBtnActive = factory.create({
			elem: TAGS.SPAN,
			classes: 'start_screen__switch--active',
			id: 'active_indicator'
		});
		const switchLeft = factory.create({
			elem: TAGS.BUTTON,
			classes: ['start_screen__switch_btn_case', 'left', 'active_case'],
			id: 'left_btn',
			child: CONST.RSLANG_DATABASE_WORDS
		});
		const switchRight = factory.create({
			elem: TAGS.BUTTON,
			classes: ['start_screen__switch_btn_case', 'right'],
			id: 'right_btn',
			child: CONST.REPEAT_WORDS
		});

		const switchBtns = factory.create({
			elem: TAGS.DIV,
			classes: 'start_screen__switch_btn',
			child: [
				switchBtnActive,
				switchLeft,
				switchRight
			]
		});

		const startScreenControls = factory.create({
			elem: TAGS.DIV,
			classes: 'start_screen__controls',
			child: [
				switchBtns,
				LevelAndRoundSelect.generate()
			]
		});

		const startBtn = factory.create({
			elem: TAGS.BUTTON,
			classes: ['start_screen__start_btn', 'button'],
			id: 'start_game',
			child: CONST.START_TEXT
		});

		const startScreenContainer = factory.create({
			elem: TAGS.DIV,
			classes: 'start_screen__container',
			child: [
				gameName,
				gameDescription,
				startScreenControls,
				startBtn
			]
		});

		CONST.MAIN_CONTAINER.append(startScreenContainer);
	}
}
