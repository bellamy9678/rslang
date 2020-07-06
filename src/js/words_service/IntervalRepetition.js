import {
	PROGRESS
} from './constants';

export default class IntervalRepetition {
	constructor(wordObj) {
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
}
