import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';

const factory = new DOMElementCreator();

export default class Hints {
	init() {
		const hintsArr = ['auto-listening', 'translation', 'listening', 'background'];
		const hintIcons = ['../../assets/images/english_puzzle/a.png'
			, '../../assets/images/english_puzzle/translate.png'
			, '../../assets/images/english_puzzle/notes.png'
			, '../../assets/images/english_puzzle/picture.png'];

		this.hintControls = hintsArr.map(hint => factory.create({
			elem: TAGS.BUTTON,
			classes: [`controls__${hint}`, 'btn-icon'],
		})
		);

		this.hintControls.forEach((btn, i) => {
			const button = btn;
			button.style.backgroundImage = `url(${hintIcons[i]})`;
		});

		this.hints = factory.create({
			elem: TAGS.DIV,
			classes: 'controls__hints',
			child: this.hintControls
		});

		this.controlsContainer = document.querySelector('.controls');
		this.controlsContainer.append(this.hints);
	}
}
