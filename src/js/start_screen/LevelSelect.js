import * as CONST from './constants';
import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';

const factory = new DOMElementCreator();

export default class LevelAndRoundSelect {
	static generate() {
		this.levelSelectLabel = factory.create({
			elem: TAGS.LABEL,
			attr: { 'for': 'level' },
			child: CONST.LEVEL_TEXT
		});

		this.levelSelectDropdown = factory.create({
			elem: TAGS.SELECT,
			classes: ['start_screen__dropdown', 'start_screen__dropdown-level'],
			id: 'level_select',
			child: LevelAndRoundSelect.generateOptions(CONST.LEVELS)
		});

		this.roundSelectLabel = factory.create({
			elem: TAGS.LABEL,
			attr: { 'for': 'round' },
			child: CONST.ROUND_TEXT
		});
		this.roundSelectDropdown = factory.create({
			elem: TAGS.SELECT,
			classes: ['start_screen__dropdown', 'start_screen__dropdown-round'],
			id: 'round_select',
			child: LevelAndRoundSelect.generateOptions(CONST.ROUNDS)
		});

		this.levelAndPageSelect = factory.create({
			elem: TAGS.DIV,
			classes: 'start_screen__level-and-page',
			id: 'levelAndPageSelect',
			child: [this.levelSelectLabel, this.levelSelectDropdown, this.roundSelectLabel, this.roundSelectDropdown]
		});

		this.levelAndPageSelectContainer = factory.create({
			elem: TAGS.DIV,
			classes: 'start_screen__level_and_page_container',
			child: this.levelAndPageSelect
		});

		return this.levelAndPageSelectContainer;
	}

	static generateOptions(quantity) {
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
