import DOMElementCreator from '../utils/DOMElementCreator';

const factory = new DOMElementCreator();

export default class LevelSelect {
	init(levels = 6, rounds = 10) {
		this.levelSelectLabel = factory.create({
			elem: 'label',
			attr: { 'for': 'level' },
			child: 'Level'
		});

		this.levelSelectDropdown = factory.create({
			elem: 'select',
			classes: 'controls__dropdown-level',
			child: this.generateOptions(levels)
		});

		this.roundSelectLabel = factory.create({
			elem: 'label',
			attr: { 'for': 'round' },
			child: 'Round'
		});
		this.roundSelectDropdown = factory.create({
			elem: 'select',
			classes: 'controls__dropdown-round',
			child: this.generateOptions(rounds)
		});

		this.levelAndPageSelectContainer = factory.create({
			elem: 'div',
			classes: 'controls__level-and-page',
			child: [this.levelSelectLabel, this.levelSelectDropdown, this.roundSelectLabel, this.roundSelectDropdown]
		});

		this.controlsContainer = document.querySelector('.controls');
		this.controlsContainer.append(this.levelAndPageSelectContainer);
	}

	generateOptions(quantity) {
		this.options = [];
		for (let i = 1; i <= quantity; i += 1) {
			this.options.push(
				factory.create({
					elem: 'option',
					classes: ['my-class', 'my-super-class'],
					id: 'my-id',
					attr: { 'value': i },
					child: i
				})
			);
		}
		return this.options;
	}
}
