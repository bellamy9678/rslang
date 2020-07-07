import {
	PROGRESS,
	OFFSET_DATE_COEFFICIENT,
} from './constants';
import WORDS_EVENTS from '../observer/WordsEvents';
import Word from './Word';

export default class IntervalRepetition extends Word {
	constructor(wordObj) {
		super();
		this.wordId = wordObj.id;
		this.optional = wordObj.optional;
	}

	increaseProgress() {
		if (this.optional.progress < PROGRESS.MAX) {
			this.optional.progress += 1;
		}
		return this.optional;
	}

	decreaseProgress() {
		if (this.optional.progress > PROGRESS.MIN) {
			this.optional.progress -= 1;
		}
		return this.optional;
	}

	countBestResult() {
		this.optional.bestResult += 1;
	}

	resetBestResult() {
		this.optional.bestResult = 0;
	}

	saveShowedDate() {
		this.optional.showedDate = new Date();
	}

	static defineDifficultyCoefficient(event) {
		let coefficient;
		switch (event.type) {
			case WORDS_EVENTS.PUSHED_AGAIN:
			case WORDS_EVENTS.PUSHED_SHOW_ANSWER_BUTTON:
				coefficient = OFFSET_DATE_COEFFICIENT.AGAIN;
				break;
			case WORDS_EVENTS.PUSHED_ADD_TO_DIFFICULT:
			case WORDS_EVENTS.PUSHED_HARD:
				coefficient = OFFSET_DATE_COEFFICIENT.HARD;
				break;
			case WORDS_EVENTS.PUSHED_EASY:
				coefficient = OFFSET_DATE_COEFFICIENT.EASY;
				break;
			default:
				coefficient = OFFSET_DATE_COEFFICIENT.GOOD;
		}
		return coefficient;
	}

	setNextShowDate(event) {
		const offset = (new Date() - this.optional.showedDate);
		const coefficient = this.defineDifficultyCoefficient(event);
		this.optional.nextShowDate = new Date((new Date + (2 * offset + 24 * 3600 * 1000)) * coefficient);
	}
}
