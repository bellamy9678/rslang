import {
	EMPTY_STRING,
	WARNING_CLASS_LETTER,
	ERROR_CLASS_LETTER,
	CORRECT_CLASS_LETTER,
	DOM_POSITION_CORRECTION,
	INVISIBLE_LETTER,
	HIDDEN_CLASS
} from './CardConstants';

export default class InputHandler {
	constructor() {
		this.wordHidden = document.querySelector('#example-part-word');
		this.element = document.querySelector('#word');
	}

	static makeStringComparable(str) {
		return str.trim().toUpperCase();
	}

	clearAllSpans() {
		this.wordHidden.classList.remove(HIDDEN_CLASS);
		this.wordHidden.children.forEach((childNode) => {
			childNode.classList.remove(INVISIBLE_LETTER);
			childNode.classList.remove(ERROR_CLASS_LETTER);
			childNode.classList.remove(WARNING_CLASS_LETTER);
			childNode.classList.remove(CORRECT_CLASS_LETTER);
		});
	}

	clearInput() {
		this.element.value = EMPTY_STRING;
	}

	countErrors() {

		const answer = InputHandler.makeStringComparable(
			this.wordHidden.dataset.word
		);
		const answerLetters = answer.split(EMPTY_STRING);

		const input = InputHandler.makeStringComparable(this.element.value);
		const inputLetters = input.split(EMPTY_STRING);
		const maxErrors = Math.round(answerLetters.length / 2);

		const errorsPositions = [];

		answerLetters.forEach((letter, position) => {
			if (letter !== inputLetters[position]) {
				errorsPositions.push(position);
			}
		});

		const neededClass =
			errorsPositions.length >= maxErrors
				? ERROR_CLASS_LETTER
				: WARNING_CLASS_LETTER;
		this.clearAllSpans();

		answerLetters.forEach((letter, pos) => {
			if (errorsPositions.includes(pos)) {
				this.wordHidden
					.querySelector(`:nth-child(${pos + DOM_POSITION_CORRECTION})`)
					.classList.add(neededClass);
			} else {
				this.wordHidden
					.querySelector(`:nth-child(${pos + DOM_POSITION_CORRECTION})`)
					.classList.add(CORRECT_CLASS_LETTER);
			}
		});

		setTimeout(() => {
			this.clearAllSpans();
		}, 2000);

		this.element.addEventListener('input', () => {
			this.wordHidden.children.forEach((childNode) => {
				childNode.classList.add(INVISIBLE_LETTER);
			});
		});
	}

	showError() {
		this.countErrors();
	}
}
