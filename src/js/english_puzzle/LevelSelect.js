import * as CONST from './constants';
import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';

const factory = new DOMElementCreator();

export default class LevelSelect {
	init() {
		this.levelSelectLabel = factory.create({
			elem: TAGS.LABEL,
			attr: { 'for': 'level' },
			child: CONST.LEVEL
		});

		this.levelSelectDropdown = factory.create({
			elem: TAGS.SELECT,
			classes: ['controls__dropdown', 'controls__dropdown-level'],
			child: this.generateOptions(CONST.levels)
		});

		this.roundSelectLabel = factory.create({
			elem: TAGS.LABEL,
			attr: { 'for': 'round' },
			child: CONST.ROUND
		});
		this.roundSelectDropdown = factory.create({
			elem: TAGS.SELECT,
			classes: ['controls__dropdown', 'controls__dropdown-round'],
			child: this.generateOptions(CONST.rounds)
		});

		this.levelAndPageSelectContainer = factory.create({
			elem: TAGS.DIV,
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
					elem: TAGS.OPTION,
					attr: { 'value': i },
					child: i
				})
			);
		}
		return this.options;
	}
}
