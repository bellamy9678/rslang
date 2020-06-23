import DOMElementCreator from '../utils/DOMElementCreator';

const factory = new DOMElementCreator();

export default class GameField {
	init() {
		this.gameContainer = document.querySelector('.game__main');

		this.gamePuzzlesContainer = factory.create({
			elem: 'div',
			classes: 'game__puzzles',
		});

		this.iDontKnowBtn = factory.create({
			elem: 'button',
			classes: 'controls__btn-i-dont-know',
			child: 'I don\'t know'
		});
		this.checkBtn = factory.create({
			elem: 'button',
			classes: ['controls__btn-check', 'hide'],
			child: 'Check'
		});
		this.continueBtn = factory.create({
			elem: 'button',
			classes: ['controls__btn-continue', 'hide'],
			child: 'Continue'
		});
		this.gameControlsContainer = factory.create({
			elem: 'div',
			classes: 'game__controls',
			child: [this.iDontKnowBtn, this.checkBtn, this.continueBtn]
		});

		this.board = factory.create({
			elem: 'div',
			classes: 'board',
		});
		this.boardNumbers = factory.create({
			elem: 'div',
			classes: 'board__column-numbers',
			child: this.generateNumbers()
		});

		this.gameBoardContainer = factory.create({
			elem: 'div',
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
				elem: 'div',
				classes: 'number',
				child: i
			});
			this.numbers.push(number);
		}
		return this.numbers;
	}
}
