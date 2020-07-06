import {
	INTERVAL_PARAMS
} from './constants';

export default class IntervalRepetition {
	constructor(wordObj) {
		this.wordId = wordObj.id;
		this.optional = wordObj.optional;
	}

	increaseProgress() {
		if (this.optional.progress < INTERVAL_PARAMS.MAX_PROGRESS_LEVEL) {
			this.optional.progress += 1;
		}
		return this.optional;
	}

	decreaseProgress() {
		if (this.optional.progress > INTERVAL_PARAMS.MIN_PROGRESS_LEVEL) {
			this.optional.progress -= 1;
		}
		return this.optional;
	}
}
