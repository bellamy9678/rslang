import DOMElementCreator from '../utils/DOMElementCreator';

const factory = new DOMElementCreator();

export default class Hints {
	init() {
		this.hintsArr = ['auto-listening', 'translation', 'listening', 'background'];

		this.hintControls = this.hintsArr.map(hint => factory.create({
			elem: 'button',
			classes: `controls__${hint}`,
			child: hint
		})
		);

		this.hints = factory.create({
			elem: 'div',
			classes: 'controls__hints',
			child: this.hintControls
		});

		this.controlsContainer = document.querySelector('.controls');
		this.controlsContainer.append(this.hints);
	}
}
