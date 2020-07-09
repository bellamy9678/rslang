import {
	INTERVAL_PARAMS,
	OFFSET_DATE_COEFFICIENT,
} from './constants';
import WORDS_EVENTS from '../observer/WordsEvents';
import APIMethods from './APIMethods';

export default class IntervalRepetition {
	constructor(wordObj) {
		this.wordId = wordObj.id;
		this.optional = wordObj.optional;
	}

	async increaseProgress() {
		if (this.bestResult !== INTERVAL_PARAMS.MIN_PROGRESS_LEVEL && this.bestResult <= INTERVAL_PARAMS.MAX_PROGRESS_LEVEL) {
			this.optional.progress = this.bestResult;
		}
		await APIMethods.updateUserWord(this.wordId, {
			optional: this.optional
		});
	}

	async decreaseProgress() {
		if (this.optional.progress > INTERVAL_PARAMS.MIN_PROGRESS_LEVEL) {
			this.optional.progress -= 1;
		}
		await APIMethods.updateUserWord(this.wordId, {
			optional: this.optional
		});
	}

	async countBestResult() {
		this.optional.bestResult += 1;
		await APIMethods.updateUserWord(this.wordId, {
			optional: this.optional
		});
	}

	async resetBestResult() {
		this.optional.bestResult = 0;
		await APIMethods.updateUserWord(this.wordId, {
			optional: this.optional
		});
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

	async setDateParams(event) {
		const offset = (new Date() - this.optional.showedDate);
		const coefficient = this.defineDifficultyCoefficient(event);
		this.optional.showedDate = new Date();
		this.optional.nextShowDate = new Date((new Date() + (2 * offset + 24 * 3600 * 1000)) * coefficient);
		await APIMethods.updateUserWord(this.wordId, {
			optional: this.optional
		});
	}

	async changeWordCategory(category) {
		this.optional.category = category;
		await APIMethods.updateUserWord(this.wordId, {
			optional: this.optional
		});
	}
}
