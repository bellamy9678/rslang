import { HIDDEN_CLASS, DISPLAY_NONE_CLASS } from './CardConstants';

export default class InputHandler {
	constructor () {
		this.example = document.querySelector('#text-example-translate');
		this.meaning = document.querySelector('#text-meaning-translate');
	}

	checkMeaning() {
		const meaningEnglishPart = document.querySelector('#meaning-part-first');
		if ( !meaningEnglishPart.classList.contains(DISPLAY_NONE_CLASS)) {
			this.meaning.classList.remove(HIDDEN_CLASS);
		}
	}

	checkExample() {
		const exampleEnglishPart = document.querySelector('#example-part-first');
		if ( !exampleEnglishPart.classList.contains(DISPLAY_NONE_CLASS)) {
			this.example.classList.remove(HIDDEN_CLASS);
		}
	}
}
