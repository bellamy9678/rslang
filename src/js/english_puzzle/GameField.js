import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import * as CONST from './constants';

const factory = new DOMElementCreator();

export default class GameField {
	init() {
		this.gameContainer = document.querySelector('.game__main');

		this.gamePuzzlesContainer = factory.create({
			elem: TAGS.DIV,
			classes: 'game__puzzles',
		});

		this.iDontKnowBtn = factory.create({
			elem: TAGS.BUTTON,
			classes: ['controls__btn', 'controls__btn-i-dont-know'],
			child: CONST.I_DONT_KNOW
		});
		this.checkBtn = factory.create({
			elem: TAGS.BUTTON,
			classes: ['controls__btn', 'controls__btn-check', 'hide'],
			child: CONST.CHECK
		});
		this.continueBtn = factory.create({
			elem: TAGS.BUTTON,
			classes: ['controls__btn', 'controls__btn-continue', 'hide'],
			child: CONST.CONTINUE
		});
		this.resultsBtn = factory.create({
			elem: TAGS.BUTTON,
			classes: ['controls__btn', 'controls__btn-results', 'hide'],
			child: CONST.RESULTS
		});
		this.gameControlsContainer = factory.create({
			elem: TAGS.DIV,
			classes: 'game__controls',
			child: [this.iDontKnowBtn, this.checkBtn, this.continueBtn, this.resultsBtn]
		});

		this.board = factory.create({
			elem: TAGS.DIV,
			classes: 'board',
		});
		this.boardNumbers = factory.create({
			elem: TAGS.DIV,
			classes: 'board__column-numbers',
			child: this.generateNumbers()
		});

		this.gameBoardContainer = factory.create({
			elem: TAGS.DIV,
			classes: 'game__board',
			child: [this.boardNumbers, this.board]
		});

		this.gameContainer.append(
			this.gameBoardContainer,
			this.gamePuzzlesContainer,
			this.gameControlsContainer
		);
	}

	generateNumbers() {
		this.numbers = [];
		for (let i = 1; i <= 10; i += 1) {
			const number = factory.create({
				elem: TAGS.DIV,
				classes: 'number',
				child: i
			});
			this.numbers.push(number);
		}
		return this.numbers;
	}
}
